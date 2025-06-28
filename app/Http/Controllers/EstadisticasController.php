<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EstadisticasController extends Controller
{
    public function Index()
    {
        return Inertia::render('Estadisticas/index', []);
    }
}
