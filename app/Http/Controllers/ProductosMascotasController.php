<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Mascota;
use Inertia\Inertia;

class ProductosMascotasController extends Controller
{
    public function index()
    {
        $productos = Product::with('user')->get()->map(function ($p) {
            $p->tipo = 'producto';
            return $p;
        });
        $mascotas = Mascota::with('user')->get()->map(function ($m) {
            $m->tipo = 'mascota';
            return $m;
        });
        $items = $productos->merge($mascotas)->values();
        return Inertia::render('Dashboard/VerMascotasProductos/productos-mascotas', [
            'items' => $items
        ]);
    }
    public function store(\App\Http\Requests\StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('productos', 'public');
        }
        Product::create($data);
        return redirect()->back()->with('success', 'Producto registrado correctamente');
    }
}
