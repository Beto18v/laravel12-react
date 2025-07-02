<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\Product;
use App\Models\Mascota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SolicitudesController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'aliado') {
            $productoIds = Product::where('user_id', $user->id)->pluck('id');
            $mascotaIds = Mascota::where('user_id', $user->id)->pluck('id');
            $solicitudes = Solicitud::with(['user', 'producto', 'mascota'])
                ->where(function($q) use ($productoIds, $mascotaIds) {
                    $q->where(function($q2) use ($productoIds) {
                        $q2->where('tipo', 'compra')->whereIn('item_id', $productoIds);
                    })->orWhere(function($q2) use ($mascotaIds) {
                        $q2->where('tipo', 'adopcion')->whereIn('item_id', $mascotaIds);
                    });
                })
                ->orderByDesc('id')
                ->get();
        } else {
            $solicitudes = Solicitud::with(['user', 'producto', 'mascota'])->where('user_id', $user->id)->orderByDesc('id')->get();
        }
        return Inertia::render('Dashboard/Solicitudes/index', [
            'solicitudes' => $solicitudes,
        ]);
    }
}
