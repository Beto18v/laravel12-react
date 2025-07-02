import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Solicitudes',
        href: '/solicitudes',
    },
];

export default function PendingRequests() {
    const solicitudesRaw = usePage().props.solicitudes;
    const solicitudes = Array.isArray(solicitudesRaw) ? solicitudesRaw : [];
    const flash = usePage().props.flash as { success?: string };

    type StatusType = 'En proceso' | 'Revisión' | 'Entrevista' | 'Aprobada' | 'Rechazada';

    const getStatusBadge = (status: string) => {
        const statusClasses: Record<StatusType, string> = {
            'En proceso': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            Revisión: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            Entrevista: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            Aprobada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            Rechazada: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        };
        return statusClasses[status as StatusType] || statusClasses['En proceso'];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Solicitudes Pendientes" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="container mx-auto">
                    {flash?.success && (
                        <div className="mb-6 animate-fade-in rounded-lg border-l-4 border-green-500 bg-green-100 p-4 text-center text-green-800 shadow-lg dark:border-green-600 dark:bg-gray-800 dark:text-green-300">
                            {flash.success}
                        </div>
                    )}

                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Solicitudes Pendientes</h1>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-100">
                            Ver todas
                        </button>
                    </div>

                    {solicitudes.length > 0 ? (
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Tipo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Solicitante
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Fecha
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {solicitudes.map((solicitud: any) => (
                                            <tr key={solicitud.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-semibold capitalize">{solicitud.tipo}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {solicitud.tipo === 'compra' && solicitud.producto ? solicitud.producto.nombre : ''}
                                                    {solicitud.tipo === 'adopcion' && solicitud.mascota ? solicitud.mascota.nombre : ''}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {solicitud.user?.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusBadge(solicitud.estado)}`}>
                                                        {solicitud.estado}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(solicitud.created_at).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
                            <p className="text-gray-600 dark:text-gray-400">No hay solicitudes pendientes.</p>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
