<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/registro-opciones', function () {
    return Inertia::render('auth/registro-opciones');
})->name('register.options');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('favoritos', [App\Http\Controllers\FavoritosController::class, 'index'])->name('favoritos.index');
    Route::get('solicitudes', [App\Http\Controllers\SolicitudesController::class, 'index'])->name('solicitudes.index');
    Route::get('donaciones', [App\Http\Controllers\DonacionesController::class, 'index'])->name('donaciones.index');
    Route::get('mapa', [App\Http\Controllers\MapaController::class, 'index'])->name('mapa.index');
    Route::get('estadisticas', [App\Http\Controllers\EstadisticasController::class, 'index'])->name('estadisticas.index');
    Route::get('notificaciones', [App\Http\Controllers\NotificacionesController::class, 'index'])->name('notificaciones.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
