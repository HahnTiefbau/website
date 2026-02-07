<?php
declare(strict_types=1);

function get_client_ip(): string
{
    return (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

function rl_gc(string $dir, int $graceSeconds = 3600): void
{
    if (!is_dir($dir)) {
        return;
    }

    $now = time();
    foreach (glob($dir . '/rl_*.json') ?: [] as $path) {
        if (!is_file($path)) {
            continue;
        }

        $raw = @file_get_contents($path);
        if ($raw === false || trim($raw) === '') {
            @unlink($path);
            continue;
        }

        $decoded = json_decode($raw, true);
        if (!is_array($decoded) || !isset($decoded['reset'])) {
            @unlink($path);
            continue;
        }

        $reset = (int)$decoded['reset'];
        if ($reset > 0 && $reset < ($now - $graceSeconds)) {
            @unlink($path);
        }
    }
}

function rate_limit(string $key, int $limit, int $windowSeconds): array
{
    $dir = sys_get_temp_dir() . '/php_rate_limits';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    if (random_int(1, 100) === 1) {
        rl_gc($dir, 3600);
    }

    $file = $dir . '/rl_' . hash('sha256', $key) . '.json';
    $now = time();

    $data = ['reset' => $now + $windowSeconds, 'count' => 0];

    $fp = @fopen($file, 'c+');
    if ($fp === false) {
        return [true, 0];
    }

    try {
        if (!flock($fp, LOCK_EX)) {
            return [true, 0];
        }

        $raw = stream_get_contents($fp);
        if ($raw !== false && trim($raw) !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded) && isset($decoded['reset'], $decoded['count'])) {
                $data = $decoded;
            }
        }

        if ($now >= (int)$data['reset']) {
            $data['reset'] = $now + $windowSeconds;
            $data['count'] = 0;
        }

        $data['count']++;

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_UNESCAPED_SLASHES));

        $allowed = $data['count'] <= $limit;
        $retryAfter = $allowed ? 0 : max(1, (int)$data['reset'] - $now);

        return [$allowed, $retryAfter];
    } finally {
        flock($fp, LOCK_UN);
        fclose($fp);
    }
}
