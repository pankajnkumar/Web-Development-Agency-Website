<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config/database.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get form data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    // Validate required fields
    $required_fields = ['name', 'email', 'project_type', 'message'];
    $missing_fields = [];
    
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            $missing_fields[] = $field;
        }
    }
    
    if (!empty($missing_fields)) {
        throw new Exception('Missing required fields: ' . implode(', ', $missing_fields));
    }
    
    // Validate name
    $name = trim($input['name']);
    if (!preg_match('/^[a-zA-Z\s\-\.\']+$/', $name)) {
        throw new Exception('Name should only contain letters, spaces, hyphens, apostrophes, and periods.');
    }
    
    if (strlen($name) < 2) {
        throw new Exception('Name must be at least 2 characters long.');
    }
    
    if (strlen($name) > 50) {
        throw new Exception('Name must be less than 50 characters long.');
    }
    
    // Validate email
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }
    
    // Validate phone (if provided)
    $phone = '';
    if (!empty($input['phone'])) {
        $phone = trim($input['phone']);
        $cleanPhone = preg_replace('/[^\d+]/', '', $phone);
        
        if (strpos($cleanPhone, '+') === 0) {
            // International format
            if (!preg_match('/^\+[1-9]\d{1,14}$/', $cleanPhone)) {
                throw new Exception('Please enter a valid international phone number.');
            }
        } else {
            // Local format
            if (!preg_match('/^[1-9]\d{6,14}$/', $cleanPhone)) {
                throw new Exception('Please enter a valid phone number (7-15 digits).');
            }
        }
    }
    
    // Validate project type
    $validProjectTypes = ['web-development', 'business-service', 'ecommerce', 'ui-ux', 'other'];
    if (!in_array($input['project_type'], $validProjectTypes)) {
        throw new Exception('Please select a valid project type.');
    }
    
    // Validate message
    $message = trim($input['message']);
    
    if (strlen($message) > 1000) {
        throw new Exception('Message must be less than 1000 characters long.');
    }
    
    // Rate limiting check
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $db = new Database();
    $conn = $db->getConnection();
    
    // Check submissions in the last hour
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM contacts WHERE ip_address = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
    $stmt->execute([$ip_address]);
    $result = $stmt->fetch();
    
    if ($result['count'] >= MAX_SUBMISSIONS_PER_HOUR) {
        throw new Exception('Too many submissions. Please try again later.');
    }
    
    // Sanitize input
    $name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8') : '';
    $project_type = htmlspecialchars(trim($input['project_type']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Insert into database
    $stmt = $conn->prepare("
        INSERT INTO contacts (name, email, phone, project_type, message, ip_address, user_agent) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([$name, $email, $phone, $project_type, $message, $ip_address, $user_agent]);
    $contact_id = $conn->lastInsertId();
    
    // Send email notification if enabled
    if (ENABLE_EMAIL_NOTIFICATIONS) {
        sendEmailNotification($name, $email, $phone, $project_type, $message, $contact_id);
    }
    
    // Send confirmation email to user
    sendConfirmationEmail($name, $email);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you within 24 hours.',
        'contact_id' => $contact_id
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

function sendEmailNotification($name, $email, $phone, $project_type, $message, $contact_id) {
    $subject = "New Contact Form Submission - Therynox Agency";
    
    $body = "
    <html>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Contact ID:</strong> #$contact_id</p>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> " . ($phone ?: 'Not provided') . "</p>
        <p><strong>Project Type:</strong> $project_type</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($message) . "</p>
        <hr>
        <p><small>Submitted on: " . date('Y-m-d H:i:s') . "</small></p>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SMTP_FROM_NAME . ' <' . SMTP_FROM_EMAIL . '>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    ];
    
    mail(ADMIN_EMAIL, $subject, $body, implode("\r\n", $headers));
}

function sendConfirmationEmail($name, $email) {
    $subject = "Thank you for contacting Therynox Agency";
    
    $body = "
    <html>
    <body>
        <h2>Thank you for reaching out!</h2>
        <p>Dear $name,</p>
        <p>Thank you for contacting Therynox Agency. We have received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to:</p>
        <ul>
            <li>Check out our portfolio at " . SITE_URL . "</li>
            <li>Follow us on Instagram: @therynoxhq</li>
            <li>Message us on WhatsApp: +91 8287445741</li>
        </ul>
        <p>Best regards,<br>The Therynox Agency Team</p>
        <hr>
        <p><small>This is an automated message. Please do not reply to this email.</small></p>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SMTP_FROM_NAME . ' <' . SMTP_FROM_EMAIL . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    mail($email, $subject, $body, implode("\r\n", $headers));
}
?> 