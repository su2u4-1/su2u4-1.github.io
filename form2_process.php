<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST["date"] ?? '';
    $time = $_POST["time"] ?? '';
    $color = $_POST["color"] ?? '';
    $file = $_FILES["file"] ?? null;
    $datetime = $_POST["datetime"] ?? '';
    $week = $_POST["week"] ?? '';
    $month = $_POST["month"] ?? '';
    $email = $_POST["email"] ?? '';

    // 檢查檔案是否成功上傳
    $fileName = '';
    if ($file && isset($file["name"]) && $file["error"] === UPLOAD_ERR_OK) {
        $fileName = $file["name"];
    } else {
        $fileName = "No file uploaded";
    }

    // 準備郵件內容
    $subject = "New Form Submission";
    $message = "Date: " . htmlspecialchars($date) . "\n" .
               "Time: " . htmlspecialchars($time) . "\n" .
               "Color: " . htmlspecialchars($color) . "\n" .
               "File: " . htmlspecialchars($fileName) . "\n" .
               "Date and Time: " . htmlspecialchars($datetime) . "\n" .
               "Week: " . htmlspecialchars($week) . "\n" .
               "Month: " . htmlspecialchars($month) . "\n";
    $headers = "From: joey23.su@gmail.com";

    // 嘗試發送郵件 (需要配置 SMTP 或使用其他郵件服務)
    if (mail($email, $subject, $message, $headers)) {
        echo "<p>Email sent successfully!</p>";
    } else {
        echo "<p>Email sending failed. Please check your mail server configuration.</p>";
    }

    echo "<h2>Form Data Received:</h2>";
    echo "Date: " . htmlspecialchars($date) . "<br>";
    echo "Time: " . htmlspecialchars($time) . "<br>";
    echo "Color: " . htmlspecialchars($color) . "<br>";
    echo "File: " . htmlspecialchars($fileName) . "<br>";
    echo "Date and Time: " . htmlspecialchars($datetime) . "<br>";
    echo "Week: " . htmlspecialchars($week) . "<br>";
    echo "Month: " . htmlspecialchars($month) . "<br>";
}
?>