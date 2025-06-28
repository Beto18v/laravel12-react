import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Solicitudes',
        href: '/solicitudes',
    },
];

export default function PendingRequests() {
    const requests = [
        {
            id: 1,
            petName: 'Max',
            petType: 'Perro',
            applicant: 'Juan Pérez',
            date: '2023-11-15',
            status: 'En proceso',
        },
        {
            id: 2,
            petName: 'Luna',
            petType: 'Gato',
            applicant: 'María López',
            date: '2023-11-14',
            status: 'Revisión',
        },
        {
            id: 3,
            petName: 'Rocky',
            petType: 'Perro',
            applicant: 'Carlos Rodríguez',
            date: '2023-11-13',
            status: 'Entrevista',
        },
        {
            id: 4,
            petName: 'Milo',
            petType: 'Gato',
            applicant: 'Ana Martínez',
            date: '2023-11-12',
            status: 'En proceso',
        },
    ];

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
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Solicitudes Pendientes</h1>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-100">
                            Ver todas
                        </button>
                    </div>

                    {requests.length > 0 ? (
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Mascota
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Solicitante
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Fecha
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {requests.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{request.petName}</div>
                                                        <span className="ml-2 inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                            {request.petType}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                    {request.applicant}
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                    {request.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusBadge(request.status)}`}
                                                    >
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                    <button className="mr-3 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                                        Ver
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                                                        Aprobar
                                                    </button>
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
