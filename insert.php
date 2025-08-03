<?php
// استيراد الاتصال بقاعدة البيانات
include 'db.php';

// استقبال البيانات بصيغة JSON
$data = json_decode(file_get_contents("php://input"), true);

// استخراج القيم من البيانات
$motor1 = $data['motor1'];
$motor2 = $data['motor2'];
$motor3 = $data['motor3'];
$motor4 = $data['motor4'];

// إعداد الاستعلام لإدخال القيم في الجدول
$sql = "INSERT INTO poses (motor1, motor2, motor3, motor4, status)
        VALUES ('$motor1', '$motor2', '$motor3', '$motor4', 1)";

// تنفيذ الاستعلام
if ($conn->query($sql) === TRUE) {
    echo "Pose saved successfully";
} else {
    echo "Error: " . $conn->error;
}

// إغلاق الاتصال
$conn->close();
?>