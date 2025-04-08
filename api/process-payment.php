<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Đọc dữ liệu từ request
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Dữ liệu không hợp lệ']);
    exit;
}

// Kiểm tra dữ liệu đầu vào
$required_fields = ['fullName', 'phone', 'address', 'email', 'paymentMethod', 'bank', 'cart', 'subtotal', 'shippingFee', 'total'];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(['error' => "Thiếu trường $field"]);
        exit;
    }
}

// Xử lý theo phương thức thanh toán
$paymentMethod = $data['paymentMethod'];
$bank = $data['bank'];
$total = $data['total'];

// Thông tin tài khoản ngân hàng
$bankDetails = [
    'vietcombank' => [
        'bankName' => 'Ngân hàng Vietcombank',
        'accountNumber' => '1234567890',
        'accountName' => 'Công ty Biti\'s',
        'bin' => '970436', // Mã BIN của Vietcombank
    ],
    'bidv' => [
        'bankName' => 'Ngân hàng BIDV',
        'accountNumber' => '0987654321',
        'accountName' => 'Công ty Biti\'s',
        'bin' => '970418', // Mã BIN của BIDV
    ],
    'techcombank' => [
        'bankName' => 'Ngân hàng Techcombank',
        'accountNumber' => '19038996282013',
        'accountName' => 'DOAN VIET DUNG',
        'bin' => '970407', // Mã BIN của Techcombank
    ],
    'vietinbank' => [
        'bankName' => 'Ngân hàng VietinBank',
        'accountNumber' => '5566778899',
        'accountName' => 'Công ty Biti\'s',
        'bin' => '970415', // Mã BIN của VietinBank
    ],
];

if (!isset($bankDetails[$bank])) {
    echo json_encode(['error' => 'Ngân hàng không hợp lệ']);
    exit;
}

if ($paymentMethod === 'bank_transfer') {
    // Trả về thông tin chuyển khoản ngân hàng
    echo json_encode([
        'bankDetails' => $bankDetails[$bank],
    ]);
} elseif ($paymentMethod === 'qr_code') {
    // Tích hợp VietQR để tạo mã QR
    $clientId = '0326c079-aefa-4966-a239-829f7382da2e'; // Thay bằng Client ID của bạn
    $apiKey = 'c8966cd1-58ea-4204-a72c-a8589d08cddb'; // Thay bằng API Key của bạn
    $endpoint = 'https://api.vietqr.io/v2/generate';

    $orderId = 'ORDER_' . time();
    $qrData = [
        'accountNo' => $bankDetails[$bank]['accountNumber'],
        'accountName' => $bankDetails[$bank]['accountName'],
        'acqId' => $bankDetails[$bank]['bin'],
        'addInfo' => "Thanh toán đơn hàng $orderId",
        'amount' => $total,
        'template' => 'compact',
    ];

    $headers = [
        'x-client-id: ' . $clientId,
        'x-api-key: ' . $apiKey,
        'Content-Type: application/json',
    ];

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($qrData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $responseData = json_decode($response, true);
    if (isset($responseData['data']['qrDataURL'])) {
        echo json_encode([
            'qrCodeUrl' => $responseData['data']['qrDataURL'],
        ]);
    } else {
        echo json_encode(['error' => 'Không thể tạo mã QR']);
    }
} else {
    echo json_encode(['error' => 'Phương thức thanh toán không hợp lệ']);
}
?>