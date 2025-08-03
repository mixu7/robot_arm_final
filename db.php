<?php
// معلومات الاتصال بقاعدة البيانات
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'robot_arm_db';

// إنشاء الاتصال
$conn = new mysqli($host, $user, $password, $database);

// التحقق من نجاح الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>