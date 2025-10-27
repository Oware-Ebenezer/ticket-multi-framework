<?php
use Slim\Views\Twig;

return function ($app) {
    $app->get('/', function ($request, $response) {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'landing.twig');
    });
};
