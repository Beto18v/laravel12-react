import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notificaciones',
        href: '/notificaciones',
    },
];

export default function NotificationsPanel() {
    // Define the notification type for strict typing
    type NotificationType = 'info' | 'success' | 'warning' | 'error';
    interface Notification {
        id: number;
        type: NotificationType;
        message: string;
        time: string;
        read: boolean;
    }

    // Datos de ejemplo para notificaciones
    const notifications: Notification[] = [
        {
            id: 1,
            type: 'info',
            message: 'Nueva mascota registrada: Toby (Beagle)',
            time: 'Hace 2 horas',
            read: false,
        },
        {
            id: 2,
            type: 'success',
            message: 'Solicitud de adopción aprobada para Luna',
            time: 'Hace 5 horas',
            read: false,
        },
        {
            id: 3,
            type: 'warning',
            message: 'Recordatorio: 3 solicitudes pendientes de revisión',
            time: 'Hace 1 día',
            read: true,
        },
        {
            id: 4,
            type: 'error',
            message: 'Error en el procesamiento de donación #45678',
            time: 'Hace 2 días',
            read: true,
        },
        {
            id: 5,
            type: 'info',
            message: 'Actualización del sistema programada para mañana',
            time: 'Hace 3 días',
            read: true,
        },
    ];

    const getTypeIcon = (type: 'info' | 'success' | 'warning' | 'error') => {
        const icons = {
            info: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            success: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            warning: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            ),
            error: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        };
        return icons[type] || icons.info;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notificaciones" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="container mx-auto">
                    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notificaciones</h1>
                            <div className="flex space-x-2">
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    Marcar todas como leídas
                                </button>
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                    Ver todas
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`rounded-lg p-4 ${
                                        notification.read
                                            ? 'bg-gray-50 dark:bg-gray-700'
                                            : 'border-l-4 border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900'
                                    }`}
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">{getTypeIcon(notification.type)}</div>
                                        <div className="ml-3 flex-1">
                                            <p
                                                className={`text-sm ${
                                                    notification.read
                                                        ? 'text-gray-600 dark:text-gray-300'
                                                        : 'font-medium text-gray-900 dark:text-white'
                                                }`}
                                            >
                                                {notification.message}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                                        </div>
                                        <button className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {notifications.length === 0 && (
                            <div className="py-8 text-center">
                                <p className="text-gray-600 dark:text-gray-400">No tienes notificaciones.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
