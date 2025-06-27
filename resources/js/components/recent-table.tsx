interface Activity {
    id: number;
    type: string;
    description: string;
    date: string;
    status: string;
}

export function RecentTable() {
    const activities: Activity[] = [
        {
            id: 1,
            type: 'adopción',
            description: 'Juan Pérez adoptó a Max (Labrador)',
            date: '2023-11-15',
            status: 'completado',
        },
        {
            id: 2,
            type: 'donación',
            description: 'María López donó $150.000',
            date: '2023-11-14',
            status: 'completado',
        },
        {
            id: 3,
            type: 'registro',
            description: 'Carlos Rodríguez registró a Luna (Gato Siamés)',
            date: '2023-11-13',
            status: 'pendiente',
        },
        {
            id: 4,
            type: 'adopción',
            description: 'Ana Martínez adoptó a Toby (Beagle)',
            date: '2023-11-12',
            status: 'completado',
        },
        {
            id: 5,
            type: 'donación',
            description: 'Pedro Gómez donó $75.000',
            date: '2023-11-11',
            status: 'completado',
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            completado: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            pendiente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            cancelado: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        };
        return statusClasses[status as keyof typeof statusClasses] || statusClasses.pendiente;
    };

    const getTypeIcon = (type: string) => {
        const icons = {
            adopción: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
            donación: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            registro: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            ),
        };
        return icons[type as keyof typeof icons] || icons.registro;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                            Tipo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {activities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {getTypeIcon(activity.type)}
                                    <span className="ml-2 text-sm text-gray-900 capitalize dark:text-gray-100">{activity.type}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{activity.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusBadge(activity.status)}`}>
                                    {activity.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <button className="mr-3 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Ver</button>
                                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
