<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    echo "✅ Database connection successful!";
    
    // Test query
    $stmt = $conn->query("SELECT COUNT(*) as count FROM admin_users");
    $result = $stmt->fetch();
    echo "<br>✅ Admin users count: " . $result['count'];
    
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage();
}
?> 