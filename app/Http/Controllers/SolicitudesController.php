<?php
// app/Http/Controllers/SolicitudesController.php

namespace App\Http\Controllers;

use App\Models\Mascota;
use App\Models\Product;
use App\Models\Solicitud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SolicitudesController extends Controller
{
    /**
     * Muestra la lista de solicitudes.
     * Si el usuario es un 'aliado', muestra las solicitudes de sus mascotas/productos.
     * Si es un cliente, muestra solo sus propias solicitudes.
     */
    public function index()
    {
        $user = Auth::user();

        // El código que ya tenías para mostrar las solicitudes según el rol del usuario
        if ($user->role === 'aliado') {
            $mascotaIds = Mascota::where('user_id', $user->id)->pluck('id');
            // Nota: El modelo Solicitud no tiene 'producto', ajustamos la consulta.
            $solicitudes = Solicitud::with(['user', 'mascota'])
                ->whereIn('mascota_id', $mascotaIds)
                ->orderByDesc('id')
                ->get();
        } else {
            // Para clientes, muestra solo sus solicitudes
            $solicitudes = Solicitud::with(['user', 'mascota'])
                ->where('user_id', $user->id)
                ->orderByDesc('id')
                ->get();
        }

        return Inertia::render('Dashboard/Solicitudes/index', [
            'solicitudes' => $solicitudes,
        ]);
    }

    /**
     * ✨ MÉTODO AÑADIDO: Guarda una nueva solicitud de adopción en la base de datos.
     */
    public function store(Request $request)
    {
        // Validación para los campos más importantes
        $request->validate([
            'mascota_id' => 'required|exists:mascotas,id',
            'nombre_completo' => 'required|string|max:255',
            'cedula' => 'required|string|max:255',
            'acepta_proceso_evaluacion' => 'required|accepted',
            'acepta_cuidado_responsable' => 'required|accepted',
            'acepta_contrato_adopcion' => 'required|accepted',
        ]);

        $data = $request->all();
        $data['user_id'] = Auth::id();

        Solicitud::create($data);

        // Redirige a la página del índice de solicitudes con un mensaje de éxito.
        return redirect()->route('solicitudes.index')->with('success', '¡Solicitud enviada con éxito!');
    }

    /**
     * ✨ MÉTODO AÑADIDO: Cancela (elimina) una solicitud.
     */
    public function destroy(Solicitud $solicitud)
    {
        // Asegura que solo el dueño de la solicitud pueda cancelarla
        if ($solicitud->user_id !== Auth::id()) {
            abort(403, 'Acción no autorizada.');
        }

        $solicitud->delete();

        return back()->with('success', 'Solicitud cancelada correctamente.');
    }
}
