import { FormEventHandler, SetStateAction, useState } from 'react';

// Define las props que el componente recibirá
interface FormularioDonacionProps {
    showModal: boolean;
    onClose: () => void;
    onDonationSubmit: (newDonation: any) => void;
}

export default function FormularioDonacion({ showModal, onClose, onDonationSubmit }: FormularioDonacionProps) {
    const [montoSeleccionado, setMontoSeleccionado] = useState('');
    const [montoPersonalizado, setMontoPersonalizado] = useState('');
    const [formaDePago, setFormaDePago] = useState('tarjeta');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        numeroTarjeta: '',
        fechaExpiracion: '',
        cvv: '',
    });
    const [mostrarAgradecimiento, setMostrarAgradecimiento] = useState(false);

    const formatCurrency = (amount: string | number | bigint) => {
        const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(numericAmount);
    };

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

    const montoFinal = montoSeleccionado || montoPersonalizado;

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const newDonation = {
            id: Date.now(),
            donor: formData.nombre,
            amount: parseInt(montoFinal, 10),
            date: new Date().toISOString().split('T')[0],
            type: 'Monetaria',
        };
        onDonationSubmit(newDonation);
        setMostrarAgradecimiento(true);
    };

    const resetForm = () => {
        setMontoSeleccionado('');
        setMontoPersonalizado('');
        setFormaDePago('tarjeta');
        setFormData({
            nombre: '',
            email: '',
            numeroTarjeta: '',
            fechaExpiracion: '',
            cvv: '',
        });
        setMostrarAgradecimiento(false);
    };

    const handleClose = () => {
        onClose();
        setTimeout(resetForm, 300);
    };

    if (!showModal) {
        return null;
    }

    return (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
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
                                Tu generosa contribución de {formatCurrency(montoFinal)} ayudará a muchas mascotas. Hemos enviado un recibo a tu
                                correo electrónico ({formData.email}).
                            </p>
                            <button onClick={resetForm} className="mr-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
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
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Selecciona un monto (COP)</label>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {[20000, 50000, 100000, 200000].map((monto) => (
                                        <button
                                            key={monto}
                                            type="button"
                                            onClick={() => handleMontoClick(monto.toString())}
                                            className={`rounded-lg p-3 text-center transition ${
                                                montoSeleccionado === monto.toString()
                                                    ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400'
                                                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            {formatCurrency(monto)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="custom-amount" className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                                    O ingresa un monto personalizado
                                </label>
                                <input
                                    id="custom-amount"
                                    type="number"
                                    value={montoPersonalizado}
                                    onChange={handleMontoPersonalizadoChange}
                                    placeholder="Ej: 30000"
                                    className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Forma de pago</label>
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormaDePago('tarjeta')}
                                        className={`rounded-lg px-4 py-2 ${
                                            formaDePago === 'tarjeta' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-600'
                                        }`}
                                    >
                                        Tarjeta
                                    </button>
                                </div>
                            </div>

                            {formaDePago === 'tarjeta' && (
                                <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <input
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            placeholder="Nombre en la tarjeta"
                                            className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700"
                                            required
                                        />
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Correo electrónico"
                                            className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700"
                                            required
                                        />
                                    </div>
                                    <input
                                        name="numeroTarjeta"
                                        value={formData.numeroTarjeta}
                                        onChange={handleInputChange}
                                        placeholder="Número de tarjeta"
                                        className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700"
                                        required
                                    />
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <input
                                            name="fechaExpiracion"
                                            value={formData.fechaExpiracion}
                                            onChange={handleInputChange}
                                            placeholder="MM/AA"
                                            className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700"
                                            required
                                        />
                                        <input
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="CVV"
                                            className="w-full rounded-lg border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 text-right">
                                <button
                                    type="submit"
                                    disabled={!montoFinal}
                                    className="rounded-lg bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Donar {montoFinal ? formatCurrency(montoFinal) : ''}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
