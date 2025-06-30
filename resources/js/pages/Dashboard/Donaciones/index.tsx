import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import FormularioDonacion from './components/formulario-donacion';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Donaciones', href: route('donaciones.index') }];

// --- COMPONENTES REUTILIZABLES ---
const formatCurrency = (amount: string | number | bigint) => {
    const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(numericAmount);
};

const DonationsTable = ({ donations, userRole }: any) => (
    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                            {userRole === 'cliente' ? 'Refugio' : 'Donante'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">Monto</th>
                        {userRole === 'admin' && (
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                Refugio
                            </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">Fecha</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {donations.map((donation: any) => (
                        <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                {userRole === 'cliente' ? (donation.shelter?.name ?? 'N/A') : donation.donor_name}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-green-600 dark:text-green-400">{formatCurrency(donation.amount)}</span>
                            </td>
                            {userRole === 'admin' && (
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                    {donation.shelter?.name ?? 'N/A'}
                                </td>
                            )}
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                {new Date(donation.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {donations.length === 0 && <p className="p-6 text-center text-gray-500 dark:text-gray-400">No hay donaciones para mostrar.</p>}
        </div>
    </div>
);

// --- VISTA PARA CLIENTES ---
const ClientView = ({ donations, stats, onDonateClick }: any) => (
    <>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900">
                <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Donado</h3>
                <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900">
                <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Total Donaciones</h3>
                <p className="text-xl font-bold text-green-800 dark:text-green-200">{stats.donationsCount}</p>
            </div>
        </div>
        <DonationsTable donations={donations} userRole="cliente" />
        <div className="mt-6 text-center">
            <button
                onClick={onDonateClick}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
            >
                Quiero donar
            </button>
        </div>
    </>
);

// --- VISTA PARA ALIADOS Y ADMINS ---
const AllyAdminView = ({ donations, stats, userRole, userShelter }: any) => {
    // Si el usuario es un aliado pero aún no ha registrado su refugio.
    if (userRole === 'aliado' && !userShelter) {
        return (
            <div className="rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-900/30">
                <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">¡Registra tu refugio!</h2>
                <p className="my-2 text-gray-600 dark:text-gray-300">
                    Para poder recibir y gestionar donaciones, primero debes registrar tu refugio.
                </p>
                <Link
                    href={route('shelter.register')}
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                >
                    Registrar mi Refugio
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900">
                    <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Recaudado</h3>
                    <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{formatCurrency(stats.totalAmount)}</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900">
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Total Donantes</h3>
                    <p className="text-xl font-bold text-green-800 dark:text-green-200">{stats.donorsCount}</p>
                </div>
            </div>
            <DonationsTable donations={donations} userRole={userRole} />
        </>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function DonationsSummary() {
    const { donations, shelters, auth } = usePage().props as any;
    const { user } = auth;
    const [showDonationFormModal, setShowDonationFormModal] = useState(false);

    const stats = {
        totalAmount: donations.reduce((acc: number, curr: any) => acc + parseFloat(curr.amount), 0),
        donorsCount: new Set(donations.map((d: any) => d.donor_email)).size,
        donationsCount: donations.length,
    };

    const renderContentByRole = () => {
        switch (user.role) {
            case 'cliente':
                return <ClientView donations={donations} stats={stats} onDonateClick={() => setShowDonationFormModal(true)} />;
            case 'aliado':
            case 'admin':
                return <AllyAdminView donations={donations} stats={stats} userRole={user.role} userShelter={user.shelter} />;
            default:
                return <p>Vista no disponible.</p>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Donaciones" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="container mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Donaciones</h1>
                        {/* El botón de reporte ahora es visible para todos los roles */}
                        <button className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">Generar reporte</button>
                    </div>
                    {renderContentByRole()}
                    <FormularioDonacion showModal={showDonationFormModal} onClose={() => setShowDonationFormModal(false)} shelters={shelters} />
                </div>
            </main>
        </AppLayout>
    );
}
