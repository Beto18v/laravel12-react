import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos y Mascotas',
        href: '/productos-mascotas',
    },
];

type ProductoMascota = {
    id: number;
    nombre: string;
    tipo: 'producto' | 'mascota';
    descripcion: string;
    precio: number;
    user?: { name: string };
};

export default function ProductosMascotas() {
    const items = (usePage().props.items ?? []) as ProductoMascota[];
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState<'todo' | 'producto' | 'mascota'>('todo');
    const [mensaje, setMensaje] = useState<string | null>(null);

    const productosFiltrados = items.filter((producto) => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideTipo = filtro === 'todo' || producto.tipo === filtro;
        return coincideBusqueda && coincideTipo;
    });

    const handleAccion = (item: ProductoMascota) => {
        setMensaje(
            item.tipo === 'producto'
                ? `¡Has solicitado comprar el producto "${item.nombre}"! Pronto te contactaremos.`
                : `¡Has solicitado adoptar a "${item.nombre}"! Pronto te contactaremos.`,
        );
        setTimeout(() => setMensaje(null), 3500);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos y Mascotas" />

            {/* Contenedor principal con fondo gradiente */}
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Mensaje informativo */}
                    <div className="animate-fade-in flex items-center gap-3 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-800 shadow-lg dark:border-yellow-600 dark:bg-gray-800 dark:text-yellow-300">
                        <span className="text-2xl">💡</span>
                        <div>
                            <p className="font-semibold">¿Por qué comprar desde aquí?</p>
                            <p className="text-sm">
                                Al comprar productos y mascotas en la plataforma, accedes a beneficios como trazabilidad, seguridad y una cuota
                                moderadora reducida para servicios veterinarios.
                            </p>
                        </div>
                    </div>

                    {/* Feedback visual */}
                    {mensaje && (
                        <div className="animate-fade-in rounded-lg border-l-4 border-green-500 bg-green-100 p-4 text-center text-green-800 shadow-lg dark:border-green-600 dark:bg-gray-800 dark:text-green-300">
                            {mensaje}
                        </div>
                    )}

                    {/* Filtros con estilo adaptado */}
                    <div className="flex flex-col items-center gap-4 rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm md:flex-row dark:bg-gray-800/80">
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar por nombre..."
                            className="w-full rounded-md border-gray-300 bg-white p-2 text-gray-900 transition focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-1/2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <select
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value as 'todo' | 'producto' | 'mascota')}
                            className="w-full rounded-md border-gray-300 bg-white p-2 text-gray-900 transition focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-auto dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="todo">Todos</option>
                            <option value="producto">Solo productos</option>
                            <option value="mascota">Solo mascotas</option>
                        </select>
                    </div>

                    {/* Grid de Productos y Mascotas */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {productosFiltrados.map((item) => (
                            <div
                                key={item.id}
                                className="group relative flex transform flex-col overflow-hidden rounded-xl bg-white text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:text-gray-200"
                            >
                                <div className="flex flex-grow flex-col items-center p-6">
                                    <div className="absolute top-3 right-3">
                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                                                item.tipo === 'producto'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300'
                                                    : 'bg-pink-100 text-pink-800 dark:bg-pink-900/70 dark:text-pink-300'
                                            } animate-fade-in`}
                                        >
                                            {item.tipo === 'producto' ? 'Producto' : 'Mascota'}
                                        </span>
                                    </div>
                                    <h2 className="mt-4 mb-2 text-center text-xl font-semibold dark:text-white">{item.nombre}</h2>
                                    <p className="mb-4 line-clamp-3 flex-grow text-center text-sm text-gray-600 dark:text-gray-400">
                                        {item.descripcion}
                                    </p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {item.precio !== undefined && item.precio !== null && item.tipo === 'producto' ? (
                                            `$${item.precio.toLocaleString()}`
                                        ) : item.tipo === 'mascota' ? (
                                            <span className="text-base text-gray-500 italic dark:text-gray-400">Adopción</span>
                                        ) : (
                                            <span className="text-base text-gray-500 italic dark:text-gray-400">No disponible</span>
                                        )}
                                    </p>
                                    <p className="mt-1 mb-4 text-xs text-gray-500 dark:text-gray-400">
                                        Publicado por:{' '}
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">{item.user?.name || 'Aliado'}</span>
                                    </p>
                                    <button
                                        className="mt-auto w-full rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                                        onClick={() => handleAccion(item)}
                                    >
                                        {item.tipo === 'producto' ? 'Comprar' : 'Adoptar'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {productosFiltrados.length === 0 && (
                        <div className="animate-fade-in rounded-lg bg-white/80 p-16 text-center text-lg text-gray-600 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-400">
                            No se encontraron resultados.
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
