// resources/js/pages/Aliado/RegistrarProducto.tsx
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import AppLayout from '../../../layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registrar Producto',
        href: '/registrar-productos',
    },
];

export default function RegistrarProducto() {
    const { data, setData, post, processing, errors } = useForm<{
        nombre: string;
        descripcion: string;
        precio: string;
        imagen: File | null;
    }>({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: null,
    });

    const [mensaje, setMensaje] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file' && (e.target as HTMLInputElement).files) {
            const file = (e.target as HTMLInputElement).files![0];
            setData(name as keyof typeof data, file);
        } else {
            setData(name as keyof typeof data, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/productos/store', {
            forceFormData: true,
            onSuccess: () => {
                setData({ nombre: '', descripcion: '', precio: '', imagen: null });
                setMensaje('¡Producto registrado correctamente!');
                if (fileInputRef.current) fileInputRef.current.value = '';
                setTimeout(() => setMensaje(null), 3500);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Producto" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-gray-100 p-8 shadow-lg dark:bg-gray-800">
                    <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">Registrar Nuevo Producto</h1>

                    {mensaje && <div className="mb-4 rounded bg-green-100 p-3 text-green-800 shadow">{mensaje}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Nombre del producto</label>
                            <input
                                type="text"
                                name="nombre"
                                value={data.nombre}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-green-400"
                                required
                            />
                            {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={data.descripcion}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-green-400"
                                rows={4}
                                required
                            />
                            {errors.descripcion && <p className="mt-1 text-xs text-red-500">{errors.descripcion}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Precio (COP)</label>
                            <input
                                type="number"
                                name="precio"
                                value={data.precio}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-green-400"
                                required
                            />
                            {errors.precio && <p className="mt-1 text-xs text-red-500">{errors.precio}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Imagen del producto</label>
                            <input
                                type="file"
                                name="imagen"
                                accept="image/*"
                                onChange={handleChange}
                                ref={fileInputRef}
                                className="w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900 dark:file:text-green-300"
                                required
                            />
                            {errors.imagen && <p className="mt-1 text-xs text-red-500">{errors.imagen}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full transform rounded-lg bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 font-bold text-white shadow-md transition-transform hover:scale-105 hover:from-green-600 hover:to-teal-600 disabled:scale-100 disabled:opacity-50"
                        >
                            {processing ? 'Registrando...' : 'Registrar Producto'}
                        </button>
                    </form>
                </div>
            </main>
        </AppLayout>
    );
}
