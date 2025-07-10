<?php

namespace App\Http\Controllers;

// Imports de los Modelos y Requests necesarios
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Mascota;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Gate;

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
     * Muestra la vista unificada de productos y mascotas para el aliado.
     */
    public function index()
    {
        // Obtener productos y añadirles el tipo 'producto'
        $productos = Product::with('user')->get()->map(function ($producto) {
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
     * Almacena un nuevo producto usando StoreProductRequest.
     */
    public function storeWithValidation(StoreProductRequest $request)
    {
        $validatedData = $request->validated();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('productos', 'public');
        }

        Product::create([
            'nombre' => $validatedData['name'],
            'descripcion' => $validatedData['description'],
            'precio' => $validatedData['price'],
            'stock' => $validatedData['stock'],
            'user_id' => Auth::id(),
            'imagen' => $imagePath,
        ]);

        return redirect()->route('productos.mascotas')->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Almacena un nuevo producto en la base de datos (para el dashboard unificado).
     */
    public function store(Request $request)
    {
        // Validación manual para el caso del dashboard unificado
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'cantidad' => 'required|integer|min:0',
            'imagenes' => 'required|array|min:1|max:3',
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $producto = new Product();
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->stock = $request->cantidad; // Mapear cantidad a stock
        $producto->user_id = Auth::id();

        // Usar la primera imagen como imagen principal para compatibilidad
        if ($request->hasFile('imagenes') && count($request->file('imagenes')) > 0) {
            $firstImage = $request->file('imagenes')[0];
            $path = $firstImage->store('productos', 'public');
            $producto->imagen = $path;
        }

        $producto->save();

        // Guardar todas las imágenes en la tabla product_images
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $imagen) {
                $path = $imagen->store('productos', 'public');
                ProductImage::create([
                    'product_id' => $producto->id,
                    'image_path' => $path,
                    'order' => $index + 1,
                ]);
            }
        }

        return Redirect::route('productos.mascotas')->with('success', 'Producto registrado exitosamente.');
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
        return redirect()->route('productos.mascotas')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Elimina un producto de la base de datos.
     */
    public function destroy(Product $product)
    {
        // Autoriza la acción de eliminar usando Gate o Policy
        try {
            $this->authorize('delete', $product);
        } catch (\Exception $e) {
            // Si no funciona con authorize, usar Gate
            Gate::authorize('delete', $product);
        }

        // Elimina el producto
        $product->delete();

        // Redirige con un mensaje de éxito
        return redirect()->route('productos.mascotas')->with('success', 'Producto eliminado exitosamente.');
    }
}
