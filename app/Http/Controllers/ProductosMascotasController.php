<?php

namespace App\Http\Controllers;

use App\Models\Mascota;
use App\Models\Product as Producto; // Renombrado para evitar conflictos
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ProductosMascotasController extends Controller
{
    /**
     * Muestra la vista unificada de productos y mascotas para el aliado.
     */
    public function index()
    {
        // Obtener productos y añadirles el tipo 'producto'
        $productos = Producto::with('user')->get()->map(function ($producto) {
            $producto->tipo = 'producto';
            return $producto;
        });

        // Obtener mascotas y añadirles el tipo 'mascota'
        $mascotas = Mascota::with('user')->get()->map(function ($mascota) {
            $mascota->tipo = 'mascota';
            $mascota->precio = null; // Aseguramos que las mascotas no tengan precio
            return $mascota;
        });

        // Combinar y ordenar aleatoriamente los items
        $items = $productos->concat($mascotas)->shuffle();

        return Inertia::render('Dashboard/VerMascotasProductos/productos-mascotas', [
            'items' => $items
        ]);
    }

    /**
     * Almacena un nuevo producto en la base de datos.
     */
    public function store(Request $request)
    {
        // Validación de los datos del producto
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'cantidad' => 'required|integer|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Creación del nuevo producto
        $producto = new Producto($request->except('imagen'));
        $producto->user_id = Auth::id(); // Asignar el ID del usuario autenticado

        // Manejo de la subida de imagen
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('productos', 'public');
            $producto->imagen = $path;
        }

        $producto->save();

        // Redireccionar a la vista unificada con un mensaje de éxito
        return Redirect::route('productos.mascotas')->with('success', 'Producto registrado exitosamente.');
    }

    public function destroy(Producto $product)
    {
        // Verifica si el usuario actual tiene permiso para eliminar
        // según las reglas que definiremos en ProductPolicy.
        Gate::authorize('delete', $product);

        $product->delete();
        return redirect()->route('productos.mascotas')->with('success', 'Producto eliminado correctamente.');
    }
}
