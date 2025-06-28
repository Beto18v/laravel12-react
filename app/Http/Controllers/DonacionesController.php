<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DonacionesController extends Controller
{
    public function Index()
    {
        return Inertia::render('Donaciones/index', []);
    }
}
