import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { SetStateAction, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Donaciones',
        href: '/donaciones',
    },
];

export default function DonationsSummary() {
    const [showDonationFormModal, setShowDonationFormModal] = useState(false);
    const [montoSeleccionado, setMontoSeleccionado] = useState('');
    const [montoPersonalizado, setMontoPersonalizado] = useState('');
    const [formaDePago, setFormaDePago] = useState('tarjeta');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        numeroTarjeta: '',
        fechaExpiracion: '',
        cvv: '',
        direccion: '',
        ciudad: '',
        pais: '',
        codigoPostal: '',
    });
    const [mostrarAgradecimiento, setMostrarAgradecimiento] = useState(false);

    const handleMontoClick = (monto: SetStateAction<string>) => {
        setMontoSeleccionado(monto);
        setMontoPersonalizado('');
    };

    const handleMontoPersonalizadoChange = (e: { target: { value: SetStateAction<string> } }) => {
        setMontoPersonalizado(e.target.value);
        setMontoSeleccionado('');
    };

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitDonationForm = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log('Donación enviada:', { monto: montoFinal, ...formData });
        setMostrarAgradecimiento(true);
    };

    const montoFinal = montoSeleccionado || montoPersonalizado;

    const resetDonationForm = () => {
        setMontoSeleccionado('');
        setMontoPersonalizado('');
        setFormaDePago('tarjeta');
        setFormData({
            nombre: '',
            email: '',
            numeroTarjeta: '',
            fechaExpiracion: '',
            cvv: '',
            direccion: '',
            ciudad: '',
            pais: '',
            codigoPostal: '',
        });
        setMostrarAgradecimiento(false);
    };

    const handleCloseModal = () => {
        setShowDonationFormModal(false);
        resetDonationForm();
    };

    const donations = [
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
    ];

    const stats = {
        totalAmount: 575000,
        averageAmount: 115000,
        donorsCount: 5,
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
                            onClick={() => {
                                resetDonationForm();
                                setShowDonationFormModal(true);
                            }}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                        >
                            Quiero donar
                        </button>
                    </div>

                    {/* Modal para el formulario de donación */}
                    {showDonationFormModal && (
                        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                            <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                                <div className="p-6 sm:p-8">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {mostrarAgradecimiento ? 'Gracias por Donar' : 'Realizar una Donación'}
                                        </h2>
                                        <button
                                            onClick={handleCloseModal}
                                            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                                            aria-label="Cerrar"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {mostrarAgradecimiento ? (
                                        <div className="text-center">
                                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                                <svg
                                                    className="h-8 w-8 text-green-600 dark:text-green-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                                                Tu generosa contribución de {formatCurrency(montoFinal)} ayudará a muchas mascotas. Hemos enviado un
                                                recibo a tu correo electrónico ({formData.email}).
                                            </p>
                                            <button
                                                onClick={() => {
                                                    resetDonationForm();
                                                }}
                                                className="mr-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                            >
                                                Realizar otra donación
                                            </button>
                                            <button
                                                onClick={handleCloseModal}
                                                className="rounded-lg bg-gray-300 px-6 py-2 text-gray-800 transition hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmitDonationForm}>
                                            {/* Resto del formulario de donación (igual que en tu código original) */}
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
