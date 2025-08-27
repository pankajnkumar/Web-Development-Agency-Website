<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    echo "<h2>Admin User Setup</h2>";
    
    // Check if admin user already exists
    $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute(['u178769018_Therynox']);
    $existingUser = $stmt->fetch();
    
    if ($existingUser) {
        echo "<p>✅ Admin user already exists. Updating password...</p>";
        
        // Update existing user with correct password hash
        $password = 'Pankaj154239@@';
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        $updateStmt = $conn->prepare("UPDATE admin_users SET password_hash = ?, email = ? WHERE username = ?");
        $updateStmt->execute([$password_hash, 'therynox28@gmail.com', 'u178769018_Therynox']);
        
        echo "<p>✅ Password updated successfully!</p>";
    } else {
        echo "<p>Creating new admin user...</p>";
        
        // Create new admin user
        $password = 'Pankaj154239@@';
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        $insertStmt = $conn->prepare("INSERT INTO admin_users (username, password_hash, email, is_active) VALUES (?, ?, ?, 1)");
        $insertStmt->execute(['u178769018_Therynox', $password_hash, 'therynox28@gmail.com']);
        
        echo "<p>✅ Admin user created successfully!</p>";
    }
    
    // Verify the user was created/updated
    $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute(['u178769018_Therynox']);
    $user = $stmt->fetch();
    
    if ($user) {
        echo "<h3>Admin User Details:</h3>";
        echo "<p><strong>Username:</strong> " . htmlspecialchars($user['username']) . "</p>";
        echo "<p><strong>Email:</strong> " . htmlspecialchars($user['email']) . "</p>";
        echo "<p><strong>Status:</strong> " . ($user['is_active'] ? 'Active' : 'Inactive') . "</p>";
        echo "<p><strong>Created:</strong> " . $user['created_at'] . "</p>";
        
        // Test password verification
        if (password_verify('Pankaj154239@@', $user['password_hash'])) {
            echo "<p style='color: green;'>✅ Password verification successful!</p>";
        } else {
            echo "<p style='color: red;'>❌ Password verification failed!</p>";
        }
    }
    
    echo "<hr>";
    echo "<h3>Login Credentials:</h3>";
    echo "<p><strong>Username:</strong> u178769018_Therynox</p>";
    echo "<p><strong>Password:</strong> Pankaj154239@@</p>";
    echo "<p><a href='admin/login.php'>Go to Admin Login</a></p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}
?> 