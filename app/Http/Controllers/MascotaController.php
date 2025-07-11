<?php

namespace App\Http\Controllers;

use App\Models\Mascota;
use App\Http\Requests\StoreMascotaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

/**
 * MascotaController - Gestión de mascotas para adopción
 * Maneja vistas públicas, cliente y registro con múltiples imágenes
 */
class MascotaController extends Controller
{
    /**
     * Vista de mascotas para clientes
     */
    public function index()
    {
        $mascotas = Mascota::with(['user', 'images'])->get();
        return Inertia::render('Cliente/Mascotas', ['mascotas' => $mascotas]);
    }

    /**
     * Vista pública de mascotas para navegación general
     */
    public function indexPublic()
    {
        $mascotas = Mascota::with(['user', 'images'])->get();
        return Inertia::render('mascotas', ['mascotas' => $mascotas]);
    }

    /**
     * Registra mascota con sistema de múltiples imágenes (hasta 3)
     * Usa StoreMascotaRequest para validación de datos e imágenes
     */
    public function store(StoreMascotaRequest $request)
    {
        // Debug: verificar qué datos están llegando
        Log::info('Datos recibidos para registro de mascota:', $request->all());

        $data = $request->validated();
        $data['user_id'] = Auth::id();

        // Debug: verificar datos validados
        Log::info('Datos validados:', $data);

        // Primera imagen como imagen principal (compatibilidad con sistema anterior)
        if ($request->hasFile('imagenes') && count($request->file('imagenes')) > 0) {
            $firstImage = $request->file('imagenes')[0];
            $data['imagen'] = $firstImage->store('mascotas', 'public');
        }

        $mascota = Mascota::create($data);

        // Debug: verificar mascota creada
        Log::info('Mascota creada:', $mascota->toArray());

        // Guardar todas las imágenes en tabla mascota_images con orden
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $imagen) {
                $path = $imagen->store('mascotas', 'public');
                \App\Models\MascotaImage::create([
                    'mascota_id' => $mascota->id,
                    'imagen_path' => $path,
                    'orden' => $index + 1, // Orden para galería
                ]);
            }
        }

        return Redirect::route('productos.mascotas')->with('success', 'Mascota registrada correctamente');
    }

    /**
     * Elimina mascota con autorización
     */
    public function destroy(Mascota $mascota)
    {
        Gate::authorize('delete', $mascota);
        $mascota->delete();
        return redirect()->route('productos.mascotas')->with('success', 'Mascota eliminada correctamente.');
    }
}
