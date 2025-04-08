<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Cho phép CORS
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load Stripe PHP SDK
require_once 'vendor/autoload.php';

// Khởi tạo Stripe với Secret Key (thay YOUR_STRIPE_SECRET_KEY bằng key của bạn)
\Stripe\Stripe::setApiKey('sk_test_51R96vDGg9B34WCbqs5QEenLFfMOttbpPziOiTINzgt0W0suvK7XwuR3LSsORyfsAGDukn0YuuwQkLuJJyKdQ3gSf00snkU8b2h');

try {
    // Đọc dữ liệu từ request
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON data');
    }

    $amount = isset($data['amount']) ? (int)$data['amount'] : 0;
    $currency = isset($data['currency']) ? $data['currency'] : 'vnd';

    if ($amount <= 0) {
        throw new Exception('Invalid amount');
    }

    // Tạo Payment Intent
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $amount,
        'currency' => $currency,
        'payment_method_types' => ['card'],
    ]);

    // Trả về clientSecret
    echo json_encode([
        'clientSecret' => $paymentIntent->client_secret,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>