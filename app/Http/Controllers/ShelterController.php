<?php

namespace App\Http\Controllers;

use App\Models\Shelter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShelterController extends Controller
{
    /**
     * Muestra una lista de todos los refugios.
     */
    public function index()
    {
        // Obtenemos todos los refugios con la información del usuario asociado
        $shelters = Shelter::with('user')->latest()->get();

        // Renderizamos la página de refugios y le pasamos los datos
        return Inertia::render('refugios', [
            'shelters' => $shelters,
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo refugio.
     * (Este método probablemente ya lo tienes)
     */
    public function create()
    {
        return Inertia::render('shelter/register'); // O como se llame tu vista de registro
    }

    /**
     * Almacena un nuevo refugio en la base de datos.
     * (Este método también lo debes tener ya)
     */
    public function store(Request $request)
    {
        // 1. Valida que todos los campos del formulario sean correctos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:shelters,name',
            'description' => 'required|string|max:1000',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'bank_name' => 'required|string|max:100',
            'account_type' => 'required|string|max:50',
            'account_number' => 'required|string|max:50|unique:shelters,account_number',
        ]);

        // 2. Añade el ID del usuario actual (el aliado) a los datos validados
        $validatedData['user_id'] = Auth::id();

        // 3. Crea el registro en la tabla 'shelters'
        Shelter::create($validatedData);

        // 4. Redirige al usuario de vuelta a la página de donaciones.
        // Inertia recargará la página y el DonacionesController mostrará la nueva vista.
        return redirect()->route('donaciones.index')->with('success', '¡Tu fundación ha sido registrada exitosamente!');
    }
}
