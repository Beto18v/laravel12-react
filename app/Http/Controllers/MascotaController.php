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

    // Registrar mascota (solo aliado)
    public function store(StoreMascotaRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('mascotas', 'public');
        }
        Mascota::create($data);
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
