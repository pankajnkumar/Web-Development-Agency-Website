<?php
session_start();
require_once '../config/database.php';

$error = '';
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username && $password) {
        $db = new Database();
        $conn = $db->getConnection();

        $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ? AND is_active = 1 LIMIT 1");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $conn->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?")->execute([$user['id']]);
            header('Location: index.php');
            exit;
        } else {
            $error = 'Invalid username or password';
        }
    } else {
        $error = 'Please enter both username and password';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login - Therynox</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #f5f6fa; font-family: 'Poppins', Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .login-container { background: #fff; padding: 2.5rem 2rem; border-radius: 12px; box-shadow: 0 8px 32px rgba(44,62,80,0.12); width: 100%; max-width: 350px; }
        .login-header { text-align: center; margin-bottom: 1.5rem; }
        .login-header img { width: 60px; margin-bottom: 0.5rem; }
        .login-header h2 { margin: 0; font-size: 1.5rem; color: #222; }
        .form-group { margin-bottom: 1.2rem; }
        .form-group label { display: block; margin-bottom: 0.4rem; color: #333; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.7rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
        .login-btn { width: 100%; padding: 0.8rem; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .login-btn:hover { background: linear-gradient(90deg, #764ba2 0%, #667eea 100%); }
        .error-message { background: #ffeaea; color: #d8000c; padding: 0.7rem; border-radius: 5px; margin-bottom: 1rem; text-align: center; }
        .back-link { text-align: center; margin-top: 1.2rem; }
        .back-link a { color: #667eea; text-decoration: none; font-size: 0.95rem; }
        .back-link a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <img src="../LOGO BG.png" alt="Therynox Logo">
            <h2>Admin Login</h2>
        </div>
        <?php if ($error): ?>
            <div class="error-message"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="POST" autocomplete="off">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required autofocus value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="login-btn">Login</button>
        </form>
        <div class="back-link">
            <a href="../index.html">&larr; Back to Website</a>
        </div>
    </div>
</body>
</html> 