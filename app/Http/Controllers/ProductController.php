<?php

namespace App\Http\Controllers;

// Imports de los Modelos y Requests necesarios
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;

// Import para la autorización
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Usa el trait para que el método $this->authorize() funcione
    use AuthorizesRequests;

    /**
     * Muestra todos los productos en la vista pública del nav.
     */
    public function indexPublic()
    {
        $productos = Product::with('user')->get();
        return Inertia::render('productos', [
            'productos' => $productos
        ]);
    }

    /**
     * Almacena un nuevo producto en la base de datos.
     */
    public function store(StoreProductRequest $request)
    {
        // La validación se ejecuta automáticamente gracias a StoreProductRequest.
        // Si la validación falla, Laravel redirige al usuario con los errores.
        $validatedData = $request->validated();

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Guarda la imagen en storage/app/public/productos
            $imagePath = $request->file('image')->store('productos', 'public');
        }

        // Crea el producto con los datos ya validados
        Product::create([
            'nombre' => $validatedData['name'],
            'descripcion' => $validatedData['description'],
            'precio' => $validatedData['price'],
            'stock' => $validatedData['stock'],
            'user_id' => Auth::id(), // Asigna el ID del usuario autenticado
            'imagen' => $imagePath,
        ]);

        // Redirige al dashboard con un mensaje de éxito
        return redirect()->route('dashboard.ver-mascotas-productos')->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Actualiza un producto existente en la base de datos.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // 1. Autoriza la acción: verifica si el usuario actual puede actualizar este producto.
        // Esto usará la lógica que tengas en tu ProductPolicy.
        $this->authorize('update', $product);

        // 2. Valida los datos del formulario usando UpdateProductRequest.
        $validatedData = $request->validated();

        // 3. Actualiza el producto con los datos validados.
        $product->update([
            'nombre' => $validatedData['name'],
            'descripcion' => $validatedData['description'],
            'precio' => $validatedData['price'],
            'stock' => $validatedData['stock'],
        ]);

        // Si se sube una nueva imagen, actualízala también.
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('productos', 'public');
            $product->update(['imagen' => $imagePath]);
        }

        // 4. Redirige con un mensaje de éxito.
        return redirect()->route('dashboard.ver-mascotas-productos')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Elimina un producto de la base de datos.
     */
    public function destroy(Product $product)
    {
        // Autoriza la acción de eliminar
        $this->authorize('delete', $product);

        // Elimina el producto
        $product->delete();

        // Redirige con un mensaje de éxito
        return redirect()->route('dashboard.ver-mascotas-productos')->with('success', 'Producto eliminado exitosamente.');
    }
}