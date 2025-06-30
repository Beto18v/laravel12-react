<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Mascota;
use Inertia\Inertia;

class ProductosMascotasController extends Controller
{
    public function index()
    {
        $productos = Product::with('user')->get()->map(function($p) {
            $p->tipo = 'producto';
            return $p;
        });
        $mascotas = Mascota::with('user')->get()->map(function($m) {
            $m->tipo = 'mascota';
            return $m;
        });
        $items = $productos->merge($mascotas)->values();
        return Inertia::render('Cliente/ProductosMascotas', [
            'items' => $items
        ]);
    }
}
