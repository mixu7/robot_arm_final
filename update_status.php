<?php
// الاتصال بقاعدة البيانات
include 'db.php';

// إذا تم طلب حذف
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $sql = "DELETE FROM poses WHERE id = $id";
    $conn->query($sql);
    echo "Deleted";
    exit;
}

// إذا تم إرسال id للتشغيل
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id'];
    $sql = "UPDATE poses SET status = 0 WHERE id = $id";
    $conn->query($sql);
    echo "Updated";
}

$conn->close();
?>