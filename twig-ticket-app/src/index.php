<?php

use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// 1️⃣ Create Container
$container = new Container();
AppFactory::setContainer($container);

// 2️⃣ Create App
$app = AppFactory::create();

// 3️⃣ Register Twig
$twig = Twig::create(__DIR__ . '/templates', ['cache' => false]);
$container->set('view', $twig);

// 4️⃣ Add Twig Middleware
$app->add(TwigMiddleware::create($app, $twig));

// 5️⃣ Add Routing Middleware (needed for Slim 4)
$app->addRoutingMiddleware();

// 6️⃣ Include Routes
(require __DIR__ . '/routes.php')($app);

// 7️⃣ Run App
$app->run();
