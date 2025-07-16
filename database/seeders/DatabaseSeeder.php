<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory()->create([
            'name' => 'Fundación Huellitas Felices',
            'email' => 'huellitas@example.com',
        ]);

        User::factory()->create([
            'name' => 'Veterinaria El Arca',
            'email' => 'elarca@example.com',
        ]);

        // Ejecutar el seeder de posts
        $this->call([
            PostSeeder::class,
        ]);
    }
}
