<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donations = Donation::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard/Donaciones/index', [
            'donations' => $donations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validamos los datos que vienen del formulario
        $validatedData = $request->validate([
            'donor_name' => 'required|string|max:255',
            'donor_email' => 'required|email|max:255',
            'amount' => 'required|numeric|min:1000',
        ]);

        // Usamos los datos validados para crear la donación
        Donation::create($validatedData);

        return redirect()->back()->with('success', '¡Donación registrada exitosamente!');
    }
}
