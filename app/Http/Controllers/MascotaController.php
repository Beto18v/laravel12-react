<?php

namespace App\Http\Controllers;

use App\Models\Mascota;
use App\Http\Requests\StoreMascotaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        return redirect()->back()->with('success', 'Mascota registrada correctamente');
    }
}
