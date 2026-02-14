<?php
/**
 * Create Retell Web Call
 * Endpoint: POST /api/create-web-call.php
 * 
 * This is a placeholder - actual implementation requires Retell API key
 * configured on the server. For now, redirect to Railway service.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://meetstewart.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Forward to Railway infrastructure
$railway_url = 'https://stewart-infrastructure-production.up.railway.app/retell/create-web-call';

// Pass through the request
$input = file_get_contents('php://input');

$ch = curl_init($railway_url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $input
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($http_code);
echo $response;
