<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (!$name || !$email || !$message) {
    die("Bitte alle Felder ausfüllen.");
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.ionos.de';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'example@kerat.de';
    $mail->Password   = 'example!'; // passwort der email nicht des ionos account
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('info@kerat.de', 'Kontaktformular Kerat');

    $mail->addAddress('matthiaskerat1996@gmail.com');

    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = "Neue Nachricht vom Kontaktformular";

    $mail->Body =
        "Name: $name\n" .
        "Email: $email\n\n" .
        "Nachricht:\n$message\n";

    $mail->send();

    echo json_encode([
            'success' => true,
        ]);
} catch (Exception $e) {
    error_log('Mail error: ' . $mail->ErrorInfo);

        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Beim Senden ist ein Fehler aufgetreten.',
        ]);
}
