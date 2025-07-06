import { ThemeSwitcher } from '@/components/theme-switcher';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adopciones',
        href: '/adopciones',
    },
];

export default function AdoptionMap() {
    const locations = [
        { id: 1, city: 'Bogotá', count: 45, lat: 4.6097, lng: -74.0817 },
        { id: 2, city: 'Medellín', count: 32, lat: 6.2476, lng: -75.5658 },
        { id: 3, city: 'Cali', count: 28, lat: 3.4516, lng: -76.532 },
        { id: 4, city: 'Barranquilla', count: 19, lat: 10.9685, lng: -74.7813 },
        { id: 5, city: 'Cartagena', count: 15, lat: 10.3932, lng: -75.4832 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mapa de Adopciones" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="container mx-auto">
                    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mapa de Adopciones</h1>
                            <div className="flex space-x-2">
                                <select className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                    <option>Todas las mascotas</option>
                                    <option>Perros</option>
                                    <option>Gatos</option>
                                    <option>Otros</option>
                                </select>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    Actualizar
                                </button>
                            </div>
                        </div>

                        {/* Representación visual del mapa */}
                        <div className="relative mb-6 h-96 overflow-hidden rounded-lg bg-blue-50 dark:bg-gray-700">
                            {/* Aquí iría el componente de mapa real */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Mapa interactivo de Colombia
                                    <br />
                                    <span className="text-sm">(En un entorno real, aquí se mostraría un mapa interactivo)</span>
                                </p>
                            </div>

                            {/* Marcadores simulados */}
                            {locations.map((location) => (
                                <div
                                    key={location.id}
                                    className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white transition-all hover:h-7 hover:w-7"
                                    style={{
                                        // Posiciones simuladas para representación visual
                                        top: `${30 + location.lat * 5}%`,
                                        left: `${30 + location.lng * -0.3}%`,
                                        zIndex: location.count,
                                    }}
                                    title={`${location.city}: ${location.count} mascotas disponibles`}
                                >
                                    {location.count}
                                </div>
                            ))}
                        </div>

                        {/* Leyenda de ciudades */}
                        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
                            {locations.map((location) => (
                                <div key={location.id} className="rounded-lg bg-gray-50 p-3 text-center shadow-sm dark:bg-gray-700">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{location.city}</h3>
                                    <p className="text-lg font-bold text-red-600 dark:text-red-400">{location.count}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">mascotas</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-right">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Ver distribución completa
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <ThemeSwitcher />
        </AppLayout>
    );
}
