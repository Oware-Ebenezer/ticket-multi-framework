<?php
namespace Eben\TwigTicketApp\Utils;

class JsonStore {
    private string $path;

    public function __construct(string $filePath) {
        $this->path = $filePath;
        if (!file_exists($filePath)) {
            file_put_contents($filePath, json_encode([]));
        }
    }

    public function getAll(): array {
        $data = file_get_contents($this->path);
        return json_decode($data, true) ?? [];
    }

    public function save(array $users): void {
        file_put_contents($this->path, json_encode($users, JSON_PRETTY_PRINT));
    }

    public function addUser(array $user): void {
        $users = $this->getAll();
        $users[] = $user;
        $this->save($users);
    }
}
