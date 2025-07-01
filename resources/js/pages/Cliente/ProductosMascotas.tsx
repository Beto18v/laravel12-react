// resources/js/pages/Cliente/ProductosMascotas.tsx
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../layouts/app-layout';

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

    // Simulación de feedback visual al "comprar" o "adoptar"
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
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                {/* Mensaje informativo */}
                <div className="animate-fade-in flex items-center gap-3 rounded border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-800 shadow">
                    <span className="text-2xl">💡</span>
                    <div>
                        <p className="font-semibold">¿Por qué comprar desde aquí?</p>
                        <p className="text-sm">
                            Al comprar productos y mascotas en la plataforma, accedes a beneficios como trazabilidad, seguridad y una cuota moderadora
                            reducida para servicios veterinarios.
                        </p>
                    </div>
                </div>
                {/* Feedback visual */}
                {mensaje && (
                    <div className="animate-fade-in rounded border-l-4 border-green-500 bg-green-100 p-4 text-center text-green-800 shadow">
                        {mensaje}
                    </div>
                )}
                {/* Filtros */}
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por nombre..."
                        className="w-full rounded border-2 border-blue-200 p-2 transition focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-1/2"
                    />
                    <select
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value as 'todo' | 'producto' | 'mascota')}
                        className="rounded border-2 border-blue-200 p-2 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="todo">Todos</option>
                        <option value="producto">Solo productos</option>
                        <option value="mascota">Solo mascotas</option>
                    </select>
                </div>
                {/* Productos y Mascotas */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {productosFiltrados.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex transform flex-col items-center overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-lg transition-shadow duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-2xl"
                        >
                            <div className="absolute top-3 right-3">
                                <span
                                    className={`inline-block rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${
                                        item.tipo === 'producto'
                                            ? 'border-blue-200 bg-blue-100 text-blue-700'
                                            : 'border-pink-200 bg-pink-100 text-pink-700'
                                    } animate-fade-in`}
                                >
                                    {item.tipo === 'producto' ? 'Producto' : 'Mascota'}
                                </span>
                            </div>
                            <h2 className="mb-1 text-center text-xl font-semibold text-blue-700 group-hover:underline">{item.nombre}</h2>
                            <p className="mb-2 line-clamp-3 text-center text-sm text-gray-600">{item.descripcion}</p>
                            <p className="mt-2 text-lg font-bold text-green-600">
                                {item.precio !== undefined && item.precio !== null && item.tipo === 'producto' ? (
                                    `$ ${item.precio.toLocaleString()}`
                                ) : item.tipo === 'mascota' ? (
                                    <span className="text-gray-400 italic">Sin precio</span>
                                ) : (
                                    <span className="text-gray-400 italic">Precio no disponible</span>
                                )}
                            </p>
                            <p className="mt-1 mb-2 text-xs text-gray-500">
                                Publicado por: <span className="font-semibold text-blue-400">{item.user?.name || 'Aliado'}</span>
                            </p>
                            <button
                                className="mt-auto rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow transition-all duration-200 hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
                                onClick={() => handleAccion(item)}
                            >
                                {item.tipo === 'producto' ? 'Comprar' : 'Adoptar'}
                            </button>
                        </div>
                    ))}
                </div>
                {productosFiltrados.length === 0 && (
                    <div className="animate-fade-in py-16 text-center text-lg text-gray-500">No se encontraron resultados.</div>
                )}
            </main>
        </AppLayout>
    );
}
