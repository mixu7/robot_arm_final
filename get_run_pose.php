<?php
// الاتصال بقاعدة البيانات
include 'db.php';

// جلب جميع الحركات التي status فيها = 1
$sql = "SELECT * FROM poses WHERE status = 1 ORDER BY id DESC";
$result = $conn->query($sql);

$poses = [];

// تحويل النتائج إلى مصفوفة
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $poses[] = $row;
    }
}

// إرجاع البيانات بصيغة JSON
echo json_encode($poses);

// إغلاق الاتصال
$conn->close();
?>