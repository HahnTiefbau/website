<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

error_log('__DIR__=' . __DIR__);
error_log('DOCROOT=' . ($_SERVER['DOCUMENT_ROOT'] ?? ''));

$secrets = require '/usr/home/rvsfiy/config/secrets.php';

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/_rate_limit.php';

$ip = get_client_ip();

[$okIp, $retryIp] = rate_limit('contact:ip:' . $ip, 5, 600);
if (!$okIp) {
  http_response_code(429);
  header('Retry-After: ' . $retryIp);
  echo json_encode(['success' => false, 'error' => 'Zu viele Anfragen. Bitte später erneut versuchen.']);
  exit;
}

$firstName = trim((string)($_POST['firstName'] ?? ''));
$lastName  = trim((string)($_POST['lastName'] ?? ''));
$email     = trim((string)($_POST['email'] ?? ''));
$phone     = trim((string)($_POST['phone'] ?? ''));
$message   = trim((string)($_POST['message'] ?? ''));

$name = trim($firstName . ' ' . $lastName);

$honeypot = trim((string)($_POST['website'] ?? ''));
if ($honeypot !== '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Ungültige Anfrage.']);
  exit;
}

if ($firstName === '' || $lastName === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Bitte alle Pflichtfelder ausfüllen.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Ungültige E-Mail-Adresse.']);
  exit;
}

if (preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $name)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Ungültige Eingaben.']);
  exit;
}

$mail = new PHPMailer(true);

$mail->SMTPDebug = 0;
$mail->Debugoutput = function ($str, $level) {
  error_log("SMTP[$level] $str");
};

try {
  $mail->isSMTP();
  $mail->Host       = 'in-v3.mailjet.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = $secrets['MAILJET_API_KEY'];
  $mail->Password   = $secrets['MAILJET_SECRET_KEY'];
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;
  $mail->CharSet    = 'UTF-8';

  $mail->setFrom('no-reply@hahn-tief-kabelbau.de', 'Kontaktformular Webseite');
  $mail->addAddress('MatthiasKerat1996@gmail.com');
  $mail->addReplyTo($email, $name);
  $mail->isHTML(false);
  $mail->Subject = 'Neue Nachricht vom Kontaktformular';

  $bodyLines = [
    "Name: {$name}",
    "E-Mail: {$email}",
    $phone !== '' ? "Telefon: {$phone}" : "Telefon: -",
    "",
    "Nachricht:",
    $message,
  ];

  $mail->Body = implode("\n", $bodyLines);
  $mail->send();

  echo json_encode(['success' => true]);
  exit;

} catch (Exception $e) {
  error_log('Mail error: ' . $mail->ErrorInfo . ' / ' . $e->getMessage());

  http_response_code(500);
  echo json_encode([
    'success' => false,
    'error' => 'Beim Senden ist ein Fehler aufgetreten.',
  ]);
  exit;
}
