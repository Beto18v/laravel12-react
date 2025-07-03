import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

// Definimos explícitamente los tipos de datos que esperamos para mayor seguridad
interface Shelter {
    id: number;
    name: string;
}

interface FormularioDonacionProps {
    showModal: boolean;
    onClose: () => void;
    shelters: Shelter[];
}

export default function FormularioDonacion({ showModal, onClose, shelters }: FormularioDonacionProps) {
    // Tomamos los datos del usuario autenticado para pre-llenar los campos
    const { auth } = usePage().props as any;

    const { data, setData, post, processing, errors, reset, wasSuccessful, clearErrors } = useForm({
        donor_name: auth.user.name || '',
        donor_email: auth.user.email || '',
        amount: '',
        shelter_id: '',
    });

    const [montoSeleccionado, setMontoSeleccionado] = useState('');
    const [montoPersonalizado, setMontoPersonalizado] = useState('');
    const [mostrarAgradecimiento, setMostrarAgradecimiento] = useState(false);

    useEffect(() => {
        if (wasSuccessful) {
            setMostrarAgradecimiento(true);
        }
    }, [wasSuccessful]);

    const formatCurrency = (amount: string | number | bigint) => {
        const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(numericAmount);
    };

    const handleMontoClick = (monto: string) => {
        setMontoSeleccionado(monto);
        setMontoPersonalizado('');
        setData('amount', monto);
    };

    const handleMontoPersonalizadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMontoPersonalizado(e.target.value);
        setMontoSeleccionado('');
        setData('amount', e.target.value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('donaciones.store'), {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    const handleClose = () => {
        if (mostrarAgradecimiento) {
            reset();
            setMontoSeleccionado('');
            setMontoPersonalizado('');
            setMostrarAgradecimiento(false);
        }
        clearErrors();
        onClose();
    };

    const handleOtraDonacion = () => {
        reset('amount', 'shelter_id');
        setMontoSeleccionado('');
        setMontoPersonalizado('');
        setMostrarAgradecimiento(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                <div className="p-6 sm:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {mostrarAgradecimiento ? '¡Gracias por tu Donación!' : 'Realizar una Donación'}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                Tu generosa contribución ayudará a muchas mascotas. Hemos enviado un recibo a tu correo electrónico.
                            </p>
                            <button
                                onClick={handleOtraDonacion}
                                className="mr-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                            >
                                Realizar otra donación
                            </button>
                            <button
                                onClick={handleClose}
                                className="rounded-lg bg-gray-300 px-6 py-2 text-gray-800 transition hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                            >
                                Cerrar
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* --- SECCIÓN DE DATOS DEL DONANTE (AQUÍ ESTÁN LOS CAMPOS FALTANTES) --- */}
                            <fieldset className="space-y-4 rounded-lg border p-4 dark:border-gray-700">
                                <legend className="px-2 font-medium text-gray-700 dark:text-gray-300">Tus Datos</legend>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="donor_name">Nombre del Donante</Label>
                                        <Input
                                            id="donor_name"
                                            value={data.donor_name}
                                            readOnly
                                            className="mt-1 cursor-not-allowed bg-gray-100 dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="donor_email">Correo Electrónico</Label>
                                        <Input
                                            id="donor_email"
                                            type="email"
                                            value={data.donor_email}
                                            readOnly
                                            className="mt-1 cursor-not-allowed bg-gray-100 dark:bg-gray-700"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* --- SECCIÓN DE LA DONACIÓN --- */}
                            <div>
                                <Label htmlFor="shelter_id" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Selecciona una fundación
                                </Label>
                                <select
                                    id="shelter_id"
                                    name="shelter_id"
                                    value={data.shelter_id}
                                    onChange={(e) => setData('shelter_id', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">-- Elige una fundación --</option>
                                    {shelters.map((shelter) => (
                                        <option key={shelter.id} value={shelter.id}>
                                            {shelter.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.shelter_id} className="mt-2" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Selecciona un monto (COP)</label>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {['20000', '50000', '100000', '200000'].map((monto) => (
                                        <button
                                            key={monto}
                                            type="button"
                                            onClick={() => handleMontoClick(monto)}
                                            className={`rounded-lg p-3 text-center transition ${data.amount === monto ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
                                        >
                                            {formatCurrency(monto)}
                                        </button>
                                    ))}
                                </div>
                                <InputError message={errors.amount} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="custom-amount" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    O ingresa un monto personalizado
                                </label>
                                <Input
                                    id="custom-amount"
                                    type="number"
                                    value={montoPersonalizado}
                                    onChange={handleMontoPersonalizadoChange}
                                    placeholder="Ej: 30000"
                                    className="w-full"
                                />
                            </div>

                            <div className="mt-8 text-right">
                                <Button
                                    type="submit"
                                    disabled={processing || !data.amount || !data.shelter_id}
                                    className="rounded-lg bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Procesando...' : `Donar ${data.amount ? formatCurrency(data.amount) : ''}`}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
