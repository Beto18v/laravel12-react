import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function FormularioFundacion() {
    // Tomamos los datos del usuario autenticado para pre-llenar el email
    const { auth } = usePage().props as any;

    // Usamos el hook useForm de Inertia para manejar el estado, errores y envío.
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: auth.user.email || '',
        description: '',
        address: '',
        city: '',
        phone: '',
        bank_name: '',
        account_type: '',
        account_number: '',
    });

    // Esta función se ejecuta cuando se envía el formulario
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Hacemos la petición POST a la ruta 'shelter.store' con los datos del formulario.
        post(route('shelter.store'));
    };

    return (
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Registra tu Fundación</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Completa la siguiente información para que los donantes puedan conocerte y apoyarte.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-8">
                <fieldset className="space-y-4">
                    <legend className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                        Información General
                    </legend>
                    <div>
                        <Label htmlFor="name">Nombre de la Fundación</Label>
                        <Input id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" required />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo Electrónico de Contacto</Label>
                        <Input id="email" name="email" value={data.email} readOnly className="mt-1 cursor-not-allowed bg-gray-100 dark:bg-gray-700" />
                    </div>
                    <div>
                        <Label htmlFor="description">Descripción o Misión</Label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-900"
                            rows={4}
                            required
                        ></textarea>
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </fieldset>

                <fieldset className="space-y-4">
                    <legend className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                        Información de Contacto
                    </legend>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                                id="address"
                                name="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="city">Ciudad</Label>
                            <Input
                                id="city"
                                name="city"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.city} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="space-y-4">
                    <legend className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                        Información para Donaciones
                    </legend>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="bank_name">Nombre del Banco</Label>
                            <Input
                                id="bank_name"
                                name="bank_name"
                                value={data.bank_name}
                                onChange={(e) => setData('bank_name', e.target.value)}
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.bank_name} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="account_type">Tipo de Cuenta (Ahorros/Corriente)</Label>
                            <Input
                                id="account_type"
                                name="account_type"
                                value={data.account_type}
                                onChange={(e) => setData('account_type', e.target.value)}
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.account_type} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="account_number">Número de Cuenta</Label>
                            <Input
                                id="account_number"
                                name="account_number"
                                value={data.account_number}
                                onChange={(e) => setData('account_number', e.target.value)}
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.account_number} className="mt-2" />
                        </div>
                    </div>
                </fieldset>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={processing} className="bg-blue-600 px-8 py-3 text-base hover:bg-blue-700">
                        {processing ? 'Registrando...' : 'Registrar mi Fundación'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
