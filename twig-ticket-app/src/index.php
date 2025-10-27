<?php
$app = require __DIR__ . '/bootstrap.php';
(require __DIR__ . '/routes.php')($app);
$app->run();
