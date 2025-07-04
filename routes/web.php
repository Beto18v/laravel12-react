<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ShelterController;

Route::get('/', function () {
    return Inertia::render('index');
})->name('index');

Route::get('/mascotas', function () {
    return Inertia::render('mascotas');
})->name('mascotas');

Route::get('/productos', fn() => Inertia::render('productos'))->name('productos');

Route::get('/refugios', [ShelterController::class, 'index'])->name('refugios');
Route::post('/shelters', [ShelterController::class, 'store'])->middleware(['auth', 'verified'])->name('shelter.store');

Route::get('/comunidad', function () {
    return Inertia::render('comunidad');
})->name('comunidad');

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
    Route::get('mapa', [App\Http\Controllers\MapaController::class, 'index'])->name('mapa.index');
    Route::get('estadisticas', [App\Http\Controllers\EstadisticasController::class, 'index'])->name('estadisticas.index');

    Route::get('/productos-mascotas', [\App\Http\Controllers\ProductosMascotasController::class, 'index'])->name('productos.mascotas');

    Route::get('/registrar-productos', fn() => Inertia::render('Dashboard/RegistrarMascotasProductos/registrar-producto'))->name('productos.registrar');
    Route::post('/productos/store', [\App\Http\Controllers\ProductosMascotasController::class, 'store']);

    Route::get('/registrar-mascotas', fn() => Inertia::render('Dashboard/RegistrarMascotasProductos/registrar-mascota'))->name('mascotas.registrar');
    Route::post('/mascotas/store', [MascotaController::class, 'store']);
    // Route::get('/mascotas', [MascotaController::class, 'index'])->name('mascotas.index');
    Route::post('/acciones-solicitud/store', [\App\Http\Controllers\AccionSolicitudController::class, 'store'])->name('acciones-solicitud.store');
    Route::post('/pagos/iniciar', [PagoController::class, 'iniciarPago']);
    Route::post('/pagos/webhook', [PagoController::class, 'webhook']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
