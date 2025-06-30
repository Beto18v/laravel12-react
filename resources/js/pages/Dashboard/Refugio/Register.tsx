import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function RegisterShelter() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('shelter.store'));
    };

    return (
        <AppLayout>
            <Head title="Registrar Refugio" />
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
                <div className="container mx-auto max-w-lg">
                    <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Registra tu Refugio</h1>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">Para poder recibir donaciones, primero debes registrar tu refugio.</p>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="dark:text-white">
                                    Nombre del Refugio
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Registrando...' : 'Registrar Refugio'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
