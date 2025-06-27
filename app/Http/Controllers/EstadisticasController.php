<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoritosController extends Controller
{
    public function Index()
    {
        return Inertia::render('Estadisticas/index', []);
    }
}
