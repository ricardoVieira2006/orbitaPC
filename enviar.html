<?php
// Orbita PC — receção de pedidos por email
// Muda esta linha para o TEU email:
$PARA = 'geral@nexustech.pt';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'Método não permitido']);
    exit;
}

function limpar($v) {
    return trim(str_replace(["\r", "\n"], ' ', strip_tags((string) $v)));
}

$tipo  = limpar($_POST['tipo'] ?? 'contacto');
$nome  = limpar($_POST['nome'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$tel   = limpar($_POST['telemovel'] ?? '');
$extra = trim(strip_tags((string) ($_POST['mensagem'] ?? '')));
$pacote = limpar($_POST['pacote'] ?? '');

if ($nome === '' || !$email) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'erro' => 'Nome e email válidos são obrigatórios.']);
    exit;
}

$assunto = "Orbita PC — Novo pedido [$tipo] de $nome";
$corpo  = "Novo pedido recebido no site Orbita PC\n";
$corpo .= "----------------------------------------\n";
$corpo .= "Tipo:      $tipo\n";
$corpo .= "Nome:      $nome\n";
$corpo .= "Email:     $email\n";
$corpo .= "Telemóvel: " . ($tel !== '' ? $tel : '—') . "\n";
if ($pacote !== '') $corpo .= "Pacote:    $pacote\n";
$corpo .= "----------------------------------------\n";
$corpo .= $extra !== '' ? $extra . "\n" : "(sem mensagem)\n";
$corpo .= "----------------------------------------\n";
$corpo .= "Recebido em " . date('d/m/Y H:i') . "\n";

$host = preg_replace('/[^a-z0-9\.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$headers = "From: Orbita PC <noreply@$host>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$ok = mail($PARA, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $corpo, $headers);

echo json_encode($ok
    ? ['ok' => true]
    : ['ok' => false, 'erro' => 'O servidor não conseguiu enviar o email. Contacta-nos: +351 916 040 762']);
