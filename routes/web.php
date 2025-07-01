<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\ProductController;

Route::get('/productos', fn() => Inertia::render('Productos'))->name('productos');


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
    Route::post('donaciones', [App\Http\Controllers\DonacionesController::class, 'store'])->name('donaciones.store');
    Route::post('shelter/register', [App\Http\Controllers\ShelterController::class, 'store'])->name('shelter.store');
    Route::get('mapa', [App\Http\Controllers\MapaController::class, 'index'])->name('mapa.index');
    Route::get('estadisticas', [App\Http\Controllers\EstadisticasController::class, 'index'])->name('estadisticas.index');
    Route::get('notificaciones', [App\Http\Controllers\NotificacionesController::class, 'index'])->name('notificaciones.index');

    Route::get('/productos-mascotas', [\App\Http\Controllers\ProductosMascotasController::class, 'index'])->name('productos.mascotas');

    Route::get('/registrar-productos', fn() => Inertia::render('Dashboard/RegistrarMascotasProductos/registrar-producto'))->name('productos.registrar');
    Route::post('/productos/store', [ProductController::class, 'store']);

    Route::get('/registrar-mascotas', fn() => Inertia::render('Dashboard/RegistrarMascotasProductos/registrar-mascota'))->name('mascotas.registrar');
    Route::post('/mascotas/store', [MascotaController::class, 'store']);
    // Route::get('/mascotas', [MascotaController::class, 'index'])->name('mascotas.index');
});

Route::get('/mascotas-img/{filename}', function ($filename) {
    $path = storage_path('app/public/mascotas/' . $filename);
    if (!\Illuminate\Support\Facades\File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
})->where('filename', '.*');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
