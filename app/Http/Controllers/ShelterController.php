<?php

namespace App\Http\Controllers;

use App\Models\Shelter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShelterController extends Controller
{
    public function create()
    {
        return Inertia::render('Dashboard/Shelter/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:shelters,name',
        ]);

        Shelter::create([
            'name' => $request->name,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('donaciones.index')->with('success', 'Refugio registrado exitosamente.');
    }
}
