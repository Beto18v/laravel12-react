<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SolicitudesController extends Controller
{
    public function Index()
    {
        return Inertia::render('Solicitudes/index', []);
    }
}
