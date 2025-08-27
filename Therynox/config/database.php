<?php
// Database Configuration
class Database {
    private $host = 'localhost';
    private $db_name = 'u178769018_Therynox';
    private $username = 'u178769018_Therynox';
    private $password = 'Pankaj154239@@';
    private $conn;

    public function getConnection() {
        if ($this->conn === null) {
            try {
                $this->conn = new PDO(
                    "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4",
                    $this->username,
                    $this->password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]
                );
            } catch (PDOException $e) {
                die("Database connection failed: " . $e->getMessage());
            }
        }
        return $this->conn;
    }
}

// Email Configuration
define('SMTP_HOST', 'smtp.gmail.com');  // Change to your SMTP server
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'therynox28@gmail.com');  // Change to your email
define('SMTP_PASSWORD', '');  // Change to your email password or app password
define('SMTP_FROM_EMAIL', 'therynox28@gmail.com');
define('SMTP_FROM_NAME', 'Therynox Agency');

// Site Configuration
define('SITE_URL', 'https://therynox.com');  // Change to your actual domain
define('ADMIN_EMAIL', 'therynox28@gmail.com');

// Security Configuration
define('MAX_SUBMISSIONS_PER_HOUR', 10);
define('ENABLE_CAPTCHA', false);  // Set to true if you want to add CAPTCHA
define('ENABLE_EMAIL_NOTIFICATIONS', true);
?> 