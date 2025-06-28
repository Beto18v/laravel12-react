<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificacionesController extends Controller
{
    public function Index()
    {
        return Inertia::render('Notificaciones/index', []);
    }
}
