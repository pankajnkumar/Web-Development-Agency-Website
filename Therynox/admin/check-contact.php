<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $db = new Database();
    $conn = $db->getConnection();
    $stmt = $conn->prepare("UPDATE contacts SET status = 'read' WHERE id = ?");
    $stmt->execute([$id]);
}
header('Location: index.php');
exit; 