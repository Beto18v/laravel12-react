<?php

namespace App\Http\Controllers;

use App\Models\Shelter;
use App\Models\Mascota;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapaController extends Controller
{
    /**
     * Muestra el mapa de refugios agrupando por refugio individual y filtrando por especie si se solicita.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Leer el filtro de especie desde la query (?especie=perro o ?especie=gato)
        $especie = $request->query('especie'); // null, 'perro', 'gato', etc.

        // Obtener refugios con coordenadas exactas y sus mascotas
        $sheltersWithCoordinates = Shelter::with(['user.mascotas'])
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get();

        // Mostrar cada refugio como un punto individual
        $locationsData = $sheltersWithCoordinates->map(function ($shelter) use ($especie) {
            // Filtrar mascotas por especie si se solicita
            $mascotas = $shelter->user->mascotas;
            if ($especie) {
                $mascotas = $mascotas->where('especie', strtolower($especie));
            }
            return [
                'id' => $shelter->id,
                'city' => $shelter->city,
                'name' => $shelter->name,
                'count' => $mascotas->count(), // Solo mascotas de la especie filtrada
                'shelters' => 1,
                'lat' => (float) $shelter->latitude,
                'lng' => (float) $shelter->longitude,
                'address' => $shelter->address,
            ];
        })->filter(function ($location) {
            return $location['count'] > 0; // Solo mostrar refugios con mascotas de la especie filtrada
        });

        // Fallback: Si no hay refugios con coordenadas, usar el método anterior
        if ($locationsData->isEmpty()) {
            $mascotasPorCiudad = Shelter::with(['user.mascotas'])
                ->whereNotNull('city')
                ->get()
                ->groupBy('city')
                ->map(function ($shelters, $city) {
                    $totalMascotas = $shelters->sum(function ($shelter) {
                        return $shelter->user->mascotas->count();
                    });
                    
                    return [
                        'city' => $city,
                        'count' => $totalMascotas,
                        'shelters' => $shelters->count()
                    ];
                })
                ->values();

            // Coordenadas de ciudades principales de Colombia (fallback)
            $coordenadasCiudades = [
                'Bogotá' => ['lat' => 4.6097, 'lng' => -74.0817],
                'Medellín' => ['lat' => 6.2476, 'lng' => -75.5658],
                'Cali' => ['lat' => 3.4516, 'lng' => -76.532],
                'Barranquilla' => ['lat' => 10.9685, 'lng' => -74.7813],
                'Cartagena' => ['lat' => 10.3932, 'lng' => -75.4832],
                'Bucaramanga' => ['lat' => 7.1193, 'lng' => -73.1227],
                'Pereira' => ['lat' => 4.8133, 'lng' => -75.6961],
                'Santa Marta' => ['lat' => 11.2408, 'lng' => -74.2099],
                'Manizales' => ['lat' => 5.0703, 'lng' => -75.5138],
                'Ibagué' => ['lat' => 4.4389, 'lng' => -75.2322],
            ];

            $locationsData = $mascotasPorCiudad->map(function ($item) use ($coordenadasCiudades) {
                $city = $item['city'];
                $coordinates = $coordenadasCiudades[$city] ?? ['lat' => 4.6097, 'lng' => -74.0817];
                
                return [
                    'id' => uniqid(),
                    'city' => $city,
                    'name' => $city,
                    'count' => $item['count'],
                    'shelters' => $item['shelters'],
                    'lat' => $coordinates['lat'],
                    'lng' => $coordinates['lng'],
                    'address' => null,
                ];
            });
        }

        // (Log temporal eliminado)

        return Inertia::render('Dashboard/Mapa/index', [
            'locations' => $locationsData,
            'totalMascotas' => $locationsData->sum('count'),
            'totalCiudades' => $locationsData->count(),
        ]);
    }
}
