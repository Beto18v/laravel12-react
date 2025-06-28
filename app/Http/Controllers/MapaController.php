<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MapaController extends Controller
{
    public function Index()
    {
        return Inertia::render('Mapa/index', []);
    }
}
