// resources/js/pages/Dashboard/VerMascotasProductos/productos-mascotas.tsx

import { ThemeSwitcher } from '@/components/theme-switcher';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'; // <-- Cambio: importamos 'router'
import { useEffect, useState } from 'react';
import ProductoMascotaCard, { type CardItem } from './components/producto-mascota-card';
import RegistrarMascota from './components/registrar-mascota';
import RegistrarProducto from './components/registrar-producto';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Productos y Mascotas', href: route('productos.mascotas') }];

export default function ProductosMascotas() {
    const { items = [], auth, success } = usePage().props as any;
    const itemsTyped = items as CardItem[];
    const esAliado = auth.user?.role === 'aliado';

    const [isMascotaModalOpen, setMascotaModalOpen] = useState(false);
    const [isProductoModalOpen, setProductoModalOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState<'todo' | 'producto' | 'mascota'>('todo');
    const [mensaje, setMensaje] = useState<string | null>(null);

    useEffect(() => {
        if (success) {
            mostrarMensaje(success as string);
        }
    }, [success]);

    const productosFiltrados = itemsTyped.filter(
        (item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase()) && (filtro === 'todo' || item.tipo === filtro),
    );

    const mostrarMensaje = (msg: string) => {
        setMensaje(msg);
        setTimeout(() => setMensaje(null), 4000);
    };

    // --- MANEJADORES DE ACCIONES ---

    // Acción para Cliente (Comprar/Adoptar)
    const handleAction = (item: CardItem) => {
        const actionType = item.tipo === 'producto' ? 'compra' : 'adopcion';
        // Usamos el 'router' importado
        router.post(
            route('acciones-solicitud.store'),
            {
                tipo: actionType,
                item_id: item.id,
            },
            {
                onSuccess: () => mostrarMensaje(`¡Solicitud de ${actionType} enviada para "${item.nombre}"!`),
                onError: () => mostrarMensaje('Ocurrió un error al registrar la solicitud.'),
            },
        );
    };

    // Acción para Admin/Aliado (Editar)
    const handleEdit = (item: CardItem) => {
        alert(`Funcionalidad de editar para "${item.nombre}" aún no implementada.`);
        console.log('Editar item:', item);
    };

    // Acción para Admin/Aliado (Eliminar) - CORREGIDA
    const handleDelete = (item: CardItem) => {
        if (confirm(`¿Estás seguro de que quieres eliminar "${item.nombre}"? Esta acción no se puede deshacer.`)) {
            const deleteUrl = item.tipo === 'producto' ? `/productos/${item.id}` : `/mascotas/${item.id}`;

            // Usamos el 'router' importado
            router.delete(deleteUrl, {
                preserveScroll: true,
                // onSuccess se encarga de la recarga de datos automáticamente.
                // No es necesario llamar a router.reload() aquí.
                onSuccess: () => {
                    mostrarMensaje(`"${item.nombre}" ha sido eliminado.`);
                },
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    mostrarMensaje('No se pudo eliminar el ítem.');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos y Mascotas" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
                <div className="mx-auto max-w-7xl space-y-6 p-6">
                    {/* Mensaje de éxito */}
                    {mensaje && (
                        <div className="animate-fade-in rounded-lg border-l-4 border-green-500 bg-green-100 p-4 text-center text-green-800 shadow-lg dark:border-green-600 dark:bg-gray-800 dark:text-green-300">
                            {mensaje}
                        </div>
                    )}

                    {/* Botones de registro para Aliado */}
                    {esAliado && (
                        <div className="mb-6 flex justify-center gap-4">
                            <button
                                onClick={() => setMascotaModalOpen(true)}
                                className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-transform hover:scale-105"
                            >
                                Registrar Mascota
                            </button>
                            <button
                                onClick={() => setProductoModalOpen(true)}
                                className="rounded-lg bg-green-600 px-6 py-3 text-white shadow-md transition-transform hover:scale-105"
                            >
                                Registrar Producto
                            </button>
                        </div>
                    )}

                    {/* Modales de registro */}
                    <RegistrarMascota isOpen={isMascotaModalOpen} onClose={() => setMascotaModalOpen(false)} setMensaje={mostrarMensaje} />
                    <RegistrarProducto isOpen={isProductoModalOpen} onClose={() => setProductoModalOpen(false)} setMensaje={mostrarMensaje} />

                    {/* Filtros y búsqueda */}
                    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-sm md:flex-row dark:bg-gray-800">
                        <input
                            id="text"
                            name="text"
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar por nombre..."
                            className="w-full rounded-md border-gray-300 bg-white p-2 text-gray-900 transition focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-1/2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <select
                            id="filtro"
                            name="filtro"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value as 'todo' | 'producto' | 'mascota')}
                            className="filtro-gray-900 w-full rounded-md border-gray-300 bg-white p-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-auto dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="todo">Todos</option>
                            <option value="producto">Solo productos</option>
                            <option value="mascota">Solo mascotas</option>
                        </select>
                    </div>

                    {/* --- INICIO DE LA CUADRÍCULA DE TARJETAS --- */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {productosFiltrados.map((item) => (
                            <ProductoMascotaCard
                                key={`${item.tipo}-${item.id}`}
                                item={item}
                                onAction={handleAction}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                    {/* --- FIN DE LA CUADRÍCULA DE TARJETAS --- */}

                    {productosFiltrados.length === 0 && (
                        <div className="animate-fade-in mt-10 rounded-lg bg-white p-16 text-center text-lg text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-400">
                            No se encontraron resultados que coincidan con tu búsqueda.
                        </div>
                    )}
                </div>
            </main>
            <ThemeSwitcher />
        </AppLayout>
    );
}
