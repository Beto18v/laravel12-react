import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import FormularioDonacion from './components/formulario-donacion'; // Importa el nuevo componente

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Donaciones',
        href: '/donaciones',
    },
];

export default function DonationsSummary() {
    const [showDonationFormModal, setShowDonationFormModal] = useState(false);
    const [donations, setDonations] = useState([
        {
            id: 1,
            donor: 'María López',
            amount: 150000,
            date: '2023-11-14',
            type: 'Monetaria',
        },
        {
            id: 2,
            donor: 'Pedro Gómez',
            amount: 75000,
            date: '2023-11-11',
            type: 'Monetaria',
        },
    ]);

    const stats = {
        totalAmount: donations.reduce((acc, curr) => acc + curr.amount, 0),
        averageAmount: donations.length > 0 ? donations.reduce((acc, curr) => acc + curr.amount, 0) / donations.length : 0,
        donorsCount: new Set(donations.map((d) => d.donor)).size,
        monthlyGrowth: '+12%',
    };

    const formatCurrency = (amount: string | number | bigint) => {
        const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(numericAmount);
    };

    const handleNewDonation = (newDonation: any) => {
        setDonations([newDonation, ...donations]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resumen de Donaciones" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="container mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Resumen de Donaciones</h1>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-100">
                            Ver todas
                        </button>
                    </div>

                    {/* Tarjetas de estadísticas */}
                    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900">
                            <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Recaudado</h3>
                            <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{formatCurrency(stats.totalAmount)}</p>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900">
                            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Promedio</h3>
                            <p className="text-xl font-bold text-blue-800 dark:text-blue-200">{formatCurrency(stats.averageAmount)}</p>
                        </div>
                        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900">
                            <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Donantes</h3>
                            <p className="text-xl font-bold text-green-800 dark:text-green-200">{stats.donorsCount}</p>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900">
                            <h3 className="text-sm font-medium text-orange-700 dark:text-orange-300">Crecimiento</h3>
                            <p className="text-xl font-bold text-orange-800 dark:text-orange-200">{stats.monthlyGrowth}</p>
                        </div>
                    </div>

                    {/* Tabla de donaciones recientes */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                            Donante
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                            Monto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                            Fecha
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                            Tipo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {donations.map((donation) => (
                                        <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                                {donation.donor}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                <span className="font-medium text-green-600 dark:text-green-400">
                                                    {formatCurrency(donation.amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{donation.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex rounded-full bg-purple-100 px-2 text-xs leading-5 font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                                    {donation.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Botón de acción */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setShowDonationFormModal(true)}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                        >
                            Quiero donar
                        </button>
                    </div>

                    {/* Renderiza el componente del formulario modal */}
                    <FormularioDonacion
                        showModal={showDonationFormModal}
                        onClose={() => setShowDonationFormModal(false)}
                        onDonationSubmit={handleNewDonation}
                    />
                </div>
            </main>
        </AppLayout>
    );
}
