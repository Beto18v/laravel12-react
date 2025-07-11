<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Mascota;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

/**
 * ProductController - Controlador unificado para productos y vista dashboard
 * Maneja: Vista pública, dashboard unificado, CRUD de productos con múltiples imágenes
 */
class ProductController extends Controller
{
    use AuthorizesRequests;

    /**
     * Vista pública de productos para navegación general
     */
    public function indexPublic()
    {
        $productos = Product::with('user')->get()->map(function ($producto) {
            return (object) [
                'id' => $producto->id,
                'nombre' => $producto->nombre,        // Usar accessor
                'descripcion' => $producto->descripcion, // Usar accessor
                'precio' => $producto->precio,        // Usar accessor
                'imagen' => $producto->imagen,
                'user' => $producto->user,
            ];
        });
        return Inertia::render('productos', ['productos' => $productos]);
    }

    /**
     * Dashboard unificado: productos y mascotas mezclados para aliados
     */
    public function index()
    {
        $user = Auth::user();

        // Si es aliado, solo mostrar sus propios productos y mascotas
        if ($user && $user->role === 'aliado') {
            // Productos del aliado autenticado
            $productos = Product::with('user')
                ->where('user_id', $user->id)
                ->get()
                ->map(function ($producto) {
                    return (object) [
                        'id' => $producto->id,
                        'nombre' => $producto->nombre,        // Usar accessor
                        'descripcion' => $producto->descripcion, // Usar accessor
                        'precio' => $producto->precio,        // Usar accessor
                        'imagen' => $producto->imagen,
                        'user_id' => $producto->user_id,
                        'user' => $producto->user,
                        'tipo' => 'producto'
                    ];
                });

            // Mascotas del aliado autenticado
            $mascotas = Mascota::with('user')
                ->where('user_id', $user->id)
                ->get()
                ->map(function ($mascota) {
                    return (object) [
                        'id' => $mascota->id,
                        'nombre' => $mascota->nombre,
                        'descripcion' => $mascota->descripcion,
                        'precio' => null,
                        'imagen' => $mascota->imagen,
                        'user_id' => $mascota->user_id,
                        'user' => $mascota->user,
                        'tipo' => 'mascota'
                    ];
                });
        } else {
            // Para clientes y otros roles, mostrar todos los productos y mascotas
            $productos = Product::with('user')->get()->map(function ($producto) {
                return (object) [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,        // Usar accessor
                    'descripcion' => $producto->descripcion, // Usar accessor
                    'precio' => $producto->precio,        // Usar accessor
                    'imagen' => $producto->imagen,
                    'user_id' => $producto->user_id,
                    'user' => $producto->user,
                    'tipo' => 'producto'
                ];
            });

            // Mascotas con tipo identificador (sin precio)
            $mascotas = Mascota::with('user')->get()->map(function ($mascota) {
                return (object) [
                    'id' => $mascota->id,
                    'nombre' => $mascota->nombre,
                    'descripcion' => $mascota->descripcion,
                    'precio' => null,
                    'imagen' => $mascota->imagen,
                    'user_id' => $mascota->user_id,
                    'user' => $mascota->user,
                    'tipo' => 'mascota'
                ];
            });
        }

        // Combinar y mezclar items para vista dinámica
        $items = $productos->concat($mascotas)->shuffle();

        return Inertia::render('Dashboard/VerMascotasProductos/productos-mascotas', [
            'items' => $items
        ]);
    }

    /**
     * Almacena producto con múltiples imágenes (1-3) para dashboard unificado
     * Crea registros en product_images y mantiene imagen principal para compatibilidad
     */
    public function store(Request $request)
    {
        // Validación para múltiples imágenes
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'cantidad' => 'required|integer|min:0',
            'imagenes' => 'required|array|min:1|max:3', // Array de 1-3 imágenes
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Crear producto principal con nombres de campos actualizados
        $producto = new Product();
        $producto->name = $request->nombre;         // Mapear nombre -> name
        $producto->description = $request->descripcion; // Mapear descripcion -> description
        $producto->price = $request->precio;        // Mapear precio -> price
        $producto->stock = $request->cantidad;      // Mapear cantidad -> stock
        $producto->user_id = Auth::id();

        // Usar primera imagen como imagen principal (compatibilidad con sistema anterior)
        if ($request->hasFile('imagenes') && count($request->file('imagenes')) > 0) {
            $firstImage = $request->file('imagenes')[0];
            $path = $firstImage->store('productos', 'public');
            $producto->imagen = $path;
        }

        $producto->save();

        // Guardar todas las imágenes en tabla de relación product_images
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $imagen) {
                $path = $imagen->store('productos', 'public');
                ProductImage::create([
                    'product_id' => $producto->id,
                    'image_path' => $path,
                    'order' => $index + 1, // Orden de las imágenes
                ]);
            }
        }

        return Redirect::route('productos.mascotas')->with('success', 'Producto registrado exitosamente.');
    }

    /**
     * Actualiza producto existente con validación de autorización
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        $validatedData = $request->validated();

        // Actualizar datos del producto
        $product->update([
            'nombre' => $validatedData['name'],
            'descripcion' => $validatedData['description'],
            'precio' => $validatedData['price'],
            'stock' => $validatedData['stock'],
        ]);

        // Actualizar imagen si se proporciona nueva
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('productos', 'public');
            $product->update(['imagen' => $imagePath]);
        }

        return redirect()->route('productos.mascotas')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Elimina producto con autorización
     */
    public function destroy(Product $product)
    {
        // Verificar autorización para eliminar
        try {
            $this->authorize('delete', $product);
        } catch (\Exception $e) {
            Gate::authorize('delete', $product);
        }

        $product->delete();
        return redirect()->route('productos.mascotas')->with('success', 'Producto eliminado exitosamente.');
    }
}
