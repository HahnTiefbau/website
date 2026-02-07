<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$secrets = require __DIR__ . '/../../../config/secrets.php';

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/_rate_limit.php';

$ip = get_client_ip();
[$okIp, $retryIp] = rate_limit('apply:ip:' . $ip, 5, 600);
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
$jobName   = trim((string)($_POST['jobName'] ?? ''));

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

if (preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $name) || preg_match("/[\r\n]/", $jobName)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Ungültige Eingaben.']);
  exit;
}

if (mb_strlen($jobName) > 120) {
  $jobName = mb_substr($jobName, 0, 120);
}

$maxFiles = 5;
$maxSizePerFileBytes = 5 * 1024 * 1024;
$attachments = [];

if (isset($_FILES['documents'])) {
  $files = $_FILES['documents'];

  $names = is_array($files['name']) ? $files['name'] : [$files['name']];
  $tmpNs = is_array($files['tmp_name']) ? $files['tmp_name'] : [$files['tmp_name']];
  $errs  = is_array($files['error']) ? $files['error'] : [$files['error']];
  $sizes = is_array($files['size']) ? $files['size'] : [$files['size']];

  $realCount = 0;
  foreach ($errs as $e) {
    if ($e !== UPLOAD_ERR_NO_FILE) $realCount++;
  }

  if ($realCount > $maxFiles) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => "Maximal {$maxFiles} PDF-Dateien erlaubt."]);
    exit;
  }

  for ($i = 0; $i < count($names); $i++) {
    if ($errs[$i] === UPLOAD_ERR_NO_FILE) continue;

    if ($errs[$i] !== UPLOAD_ERR_OK) {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'Fehler beim Datei-Upload.']);
      exit;
    }

    if ($sizes[$i] > $maxSizePerFileBytes) {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'Eine Datei ist zu groß (max. 5 MB pro Datei).']);
      exit;
    }

    $originalName = (string)$names[$i];
    $safeName = preg_replace('/[^a-zA-Z0-9._-]+/', '_', basename($originalName)) ?: ("document_" . ($i + 1) . ".pdf");

    $tmpPath = (string)$tmpNs[$i];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime  = $finfo->file($tmpPath) ?: '';
    $ext   = strtolower(pathinfo($safeName, PATHINFO_EXTENSION));

    if ($ext !== 'pdf' || $mime !== 'application/pdf') {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'Nur PDF-Dateien sind erlaubt.']);
      exit;
    }

    $attachments[] = [
      'path' => $tmpPath,
      'name' => $safeName,
    ];
  }
}

$fromEmail = 'no-reply@hahn-tief-kabelbau.de';
$fromName  = 'Hahn Tief- & Kabelbau';
$internalRecipient = 'MatthiasKerat1996@gmail.com';

$subjectJob = $jobName !== '' ? $jobName : 'Unbekannt';

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

  $mail->setFrom($fromEmail, $fromName);
  $mail->addAddress($internalRecipient);
  $mail->addReplyTo($email, $name);

  $mail->isHTML(false);
  $mail->Subject = "Bewerbung für {$subjectJob}";

  $bodyLines = [
    "Bewerbung für: {$subjectJob}",
    "",
    "Name: {$name}",
    "E-Mail: {$email}",
    $phone !== '' ? "Telefon: {$phone}" : "Telefon: -",
    "",
    "Nachricht:",
    $message,
    "",
    "Anhänge: " . (count($attachments) > 0 ? count($attachments) . " PDF(s)" : "keine"),
  ];
  $mail->Body = implode("\n", $bodyLines);

  foreach ($attachments as $att) {
    $mail->addAttachment($att['path'], $att['name']);
  }

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
