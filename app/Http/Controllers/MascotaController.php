<?php

namespace App\Http\Controllers;

use App\Models\Mascota;
use App\Http\Requests\StoreMascotaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class MascotaController extends Controller
{
    // Mostrar mascotas a clientes
    public function index()
    {
        $mascotas = Mascota::with('user')->get();
        return Inertia::render('Cliente/Mascotas', [
            'mascotas' => $mascotas
        ]);
    }

    // Mostrar mascotas en la vista pública del nav
    public function indexPublic()
    {
        $mascotas = Mascota::with('user')->get();
        return Inertia::render('mascotas', [
            'mascotas' => $mascotas
        ]);
    }

    // Registrar mascota (solo aliado)
    public function store(StoreMascotaRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        // Usar la primera imagen como imagen principal para compatibilidad
        if ($request->hasFile('imagenes') && count($request->file('imagenes')) > 0) {
            $firstImage = $request->file('imagenes')[0];
            $data['imagen'] = $firstImage->store('mascotas', 'public');
        }

        $mascota = Mascota::create($data);

        // Guardar todas las imágenes en la tabla mascota_images
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $imagen) {
                $path = $imagen->store('mascotas', 'public');
                \App\Models\MascotaImage::create([
                    'mascota_id' => $mascota->id,
                    'imagen_path' => $path,
                    'orden' => $index + 1,
                ]);
            }
        }

        return Redirect::route('productos.mascotas')->with('success', 'Mascota registrada correctamente');
    }

    public function destroy(Mascota $mascota)
    {
        // Esto verifica si el usuario actual tiene permiso para eliminar
        // según las reglas que definiremos en MascotaPolicy.
        Gate::authorize('delete', $mascota);

        $mascota->delete();
        return redirect()->route('productos.mascotas')->with('success', 'Mascota eliminada correctamente.');
    }
}
