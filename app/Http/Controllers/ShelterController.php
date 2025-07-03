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
        // 1. Obtenemos los refugios, contamos sus donaciones y los ordenamos
        $shelters = Shelter::with('user')
            ->withCount('donations') // Crea la columna 'donations_count'
            ->orderBy('donations_count', 'desc') // Ordena de mayor a menor
            ->get();

        // 2. Renderizamos la vista y le pasamos los datos
        // Asegúrate de que el nombre de la vista sea el correcto.
        // En tus archivos parece ser 'refugios.tsx', que se renderiza como 'refugios'.
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
