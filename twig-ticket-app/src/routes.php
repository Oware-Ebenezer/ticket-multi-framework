<?php

use Slim\Views\Twig;
use Eben\TwigTicketApp\Controllers\AuthController;

return function ($app) {

    // Landing page
    $app->get('/', function ($request, $response) {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'landing.twig');
    });

    // Create AuthController
    $container = $app->getContainer();
    $container->set(AuthController::class, function ($c) {
        return new AuthController($c->get('view'));
    });

    // Auth routes
    $app->get('/auth/login', [AuthController::class, 'showLogin']);
    $app->post('/auth/login', [AuthController::class, 'login']);
    $app->get('/auth/signup', [AuthController::class, 'showSignup']);
    $app->post('/auth/signup', [AuthController::class, 'signup']);
    $app->get('/auth/logout', [AuthController::class, 'logout']);

    // Dashboard
    $app->get('/dashboard', function ($request, $response) {
        if (session_status() === PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['user'])) {
            return $response->withHeader('Location', '/auth/login')->withStatus(302);
        }

        $view = Twig::fromRequest($request);
        $stats = [
            'total' => 0,
            'open' => 0,
            'in_progress' => 0,
            'closed' => 0
        ];
        return $view->render($response, 'dashboard.twig', [
            'user' => $_SESSION['user'],
            'stats' => $stats
        ]);
    });
};
