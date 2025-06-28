import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Favoritos',
        href: '/favoritos',
    },
];

export default function FavoritePets() {
    const favorites = [
        {
            id: 1,
            name: 'Max',
            type: 'Perro',
            breed: 'Labrador Mix',
            age: '2 años',
            image: 'https://c4.wallpaperflare.com/wallpaper/82/412/1020/aleman-bosque-pastor-perro-wallpaper-preview.jpg',
            status: 'Disponible',
        },
        {
            id: 2,
            name: 'Luna',
            type: 'Gato',
            breed: 'Siamés',
            age: '1 año',
            image: 'https://c4.wallpaperflare.com/wallpaper/26/58/362/animales-corre-hierba-perro-wallpaper-preview.jpg',
            status: 'Disponible',
        },
        {
            id: 3,
            name: 'Rocky',
            type: 'Perro',
            breed: 'Pastor Alemán',
            age: '3 años',
            image: 'https://cdn.pixabay.com/video/2024/03/01/202576-918431455_tiny.jpg',
            status: 'En proceso',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mascotas Favoritas" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="container mx-auto">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">Mascotas Favoritas</h1>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {favorites.map((pet) => (
                            <div
                                key={pet.id}
                                className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                            >
                                <div className="relative h-48">
                                    <img src={pet.image} alt={pet.name} className="h-full w-full object-cover" />
                                    <div className="absolute top-2 right-2">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                pet.status === 'Disponible'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            }`}
                                        >
                                            {pet.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 dark:text-white">{pet.name}</h3>
                                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        <p>
                                            {pet.breed} • {pet.age}
                                        </p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                            {pet.type}
                                        </span>
                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {favorites.length === 0 && (
                        <div className="py-8 text-center">
                            <p className="mb-4 text-gray-600 dark:text-gray-400">No has agregado mascotas a favoritos.</p>
                            <button className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                                Explorar mascotas
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
