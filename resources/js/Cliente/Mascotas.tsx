import React from 'react';
import { usePage } from '@inertiajs/react';

interface Mascota {
    id: number;
    nombre: string;
    especie: string;
    raza?: string;
    edad?: number;
    descripcion?: string;
    imagen?: string;
    user?: { name: string };
}

export default function Mascotas() {
    const mascotas = (usePage().props.mascotas ?? []) as Mascota[];
    const [mensaje, setMensaje] = React.useState<string | null>(null);

    const handleAdoptar = (mascota: Mascota) => {
        setMensaje(`¡Has solicitado adoptar a "${mascota.nombre}"! Pronto te contactaremos.`);
        setTimeout(() => setMensaje(null), 3500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center drop-shadow animate-fade-in">
                    🐾 Mascotas disponibles
                </h1>
                {mensaje && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded shadow text-center mb-6 animate-fade-in">
                        {mensaje}
                    </div>
                )}
                {mascotas && mascotas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {mascotas.map((mascota) => (
                            <div
                                key={mascota.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center border border-blue-100 transform hover:scale-105 hover:border-blue-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-3 right-3">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm border bg-pink-100 text-pink-700 border-pink-200 animate-fade-in">
                                        Mascota
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center w-full mb-4 min-h-[170px]">
                                    {mascota.imagen ? (
                                        <img
                                            src={
                                                mascota.imagen.startsWith('http')
                                                    ? mascota.imagen
                                                    : `/storage/${mascota.imagen}`
                                            }
                                            alt={mascota.nombre}
                                            className="w-40 h-40 object-cover rounded-full border-4 border-blue-200 shadow group-hover:scale-105 transition-transform duration-200"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = '/images/placeholder-pet.png';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-blue-200 bg-blue-50 text-blue-300 text-6xl shadow">
                                            <span role="img" aria-label="Sin imagen">🐾</span>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-blue-700 mb-1 text-center group-hover:underline">
                                    {mascota.nombre}
                                </h2>
                                <span className="text-sm text-blue-500 mb-2 italic">
                                    {mascota.especie}{' '}
                                    {mascota.raza && `- ${mascota.raza}`}
                                </span>
                                <div className="text-gray-600 text-sm mb-2">
                                    Edad:{' '}
                                    <span className="font-medium">
                                        {mascota.edad || 'N/A'}
                                    </span>
                                </div>
                                {mascota.descripcion && (
                                    <div className="text-gray-700 text-center mb-2 px-2 line-clamp-3">
                                        {mascota.descripcion}
                                    </div>
                                )}
                                <div className="mt-auto text-xs text-gray-400 pt-2 mb-2">
                                    Registrado por:{' '}
                                    <span className="font-semibold text-blue-400">
                                        {mascota.user?.name || 'Aliado'}
                                    </span>
                                </div>
                                <button
                                    className="px-5 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg shadow hover:from-pink-600 hover:to-pink-800 transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                                    onClick={() => handleAdoptar(mascota)}
                                >
                                    Adoptar
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg py-16 animate-fade-in">
                        No hay mascotas registradas.
                    </div>
                )}
            </div>
        </div>
    );
}
