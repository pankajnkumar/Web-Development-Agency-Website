<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

$db = new Database();
$conn = $db->getConnection();

// Fetch stats
$stats = $conn->query("SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
    SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read_count,
    SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_count
    FROM contacts")->fetch();

// Fetch recent contacts
$stmt = $conn->prepare("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10");
$stmt->execute();
$contacts = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - Therynox</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #f5f6fa; font-family: 'Poppins', Arial, sans-serif; margin: 0; }
        .container { max-width: 1100px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 8px 32px rgba(44,62,80,0.12); padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { margin: 0; font-size: 2.2rem; color: #222; }
        .stats { display: flex; justify-content: space-between; margin-bottom: 2rem; gap: 1rem; }
        .stat-card { flex: 1; background: #f8f9fa; border-radius: 8px; padding: 1.2rem; text-align: center; }
        .stat-number { font-size: 2rem; font-weight: bold; color: #667eea; }
        .contacts-table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
        .contacts-table th, .contacts-table td { padding: 0.8rem; border-bottom: 1px solid #eee; text-align: left; }
        .contacts-table th { background: #f8f9fa; }
        .logout-btn { float: right; background: #764ba2; color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; font-size: 1rem; cursor: pointer; }
        .logout-btn:hover { background: #667eea; }
        @media (max-width: 700px) {
            .stats { flex-direction: column; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <button class="logout-btn" onclick="window.location.href='logout.php'">Logout</button>
            <h1>Therynox Admin Dashboard</h1>
            <p>Welcome, <strong><?= htmlspecialchars($_SESSION['admin_username']) ?></strong></p>
        </div>
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number"><?= $stats['total'] ?></div>
                <div>Total Submissions</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?= $stats['new_count'] ?></div>
                <div>New</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?= $stats['read_count'] ?></div>
                <div>Read</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?= $stats['replied_count'] ?></div>
                <div>Replied</div>
            </div>
        </div>
        <h2>Recent Contacts</h2>
        <table class="contacts-table">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Project Type</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            <?php foreach ($contacts as $contact): ?>
            <tr>
                <td><?= htmlspecialchars($contact['name']) ?></td>
                <td><?= htmlspecialchars($contact['email']) ?></td>
                <td><?= htmlspecialchars($contact['phone']) ?></td>
                <td><?= htmlspecialchars($contact['project_type']) ?></td>
                <td><?= htmlspecialchars($contact['message']) ?></td>
                <td><?= htmlspecialchars($contact['created_at']) ?></td>
                <td style="text-align:center;">
                    <form method="post" action="toggle-contact-status.php" style="display:inline;">
                        <input type="hidden" name="id" value="<?= $contact['id'] ?>">
                        <input type="checkbox" name="status" value="read" onchange="this.form.submit()" <?= $contact['status'] === 'read' ? 'checked' : '' ?> title="Mark as Read/Unread">
                    </form>
                </td>
                <td>
                    <form method="post" action="delete-contact.php" onsubmit="return confirm('Are you sure you want to delete this contact?');" style="display:inline;">
                        <input type="hidden" name="id" value="<?= $contact['id'] ?>">
                        <button type="submit" title="Delete" style="background:#e74c3c;color:#fff;border:none;padding:0.4em 0.8em;border-radius:4px;cursor:pointer;">Delete</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>
</html> 