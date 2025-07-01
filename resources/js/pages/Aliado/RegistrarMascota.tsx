// resources/js/pages/Aliado/RegistrarMascota.tsx
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import AppLayout from '../../layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registrar Mascota',
        href: '/registrar-mascotas',
    },
];

export default function RegistrarMascota() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<{
        nombre: string;
        especie: string;
        raza: string;
        edad: string;
        descripcion: string;
        imagen: File | null;
    }>({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        descripcion: '',
        imagen: null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mensajeExito, setMensajeExito] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file' && (e.target as HTMLInputElement).files) {
            const file = (e.target as HTMLInputElement).files![0];
            setData(name as keyof typeof data, file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
            } else {
                setPreview(null);
            }
        } else {
            setData(name as keyof typeof data, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/mascotas/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreview(null);
                setMensajeExito('¡Mascota registrada exitosamente!');
                if (fileInputRef.current) fileInputRef.current.value = '';
                setTimeout(() => setMensajeExito(null), 3500);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Mascota" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl bg-gray-100 p-8 shadow-xl dark:bg-gray-800">
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">Registrar Nueva Mascota</h1>
                    {mensajeExito && (
                        <div className="animate-fade-in mb-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-4 text-center text-green-800 shadow dark:bg-green-900 dark:text-green-200">
                            {mensajeExito}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={data.nombre}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-indigo-400"
                                    required
                                />
                                {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Especie</label>
                                <input
                                    type="text"
                                    name="especie"
                                    value={data.especie}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-indigo-400"
                                    required
                                />
                                {errors.especie && <p className="mt-1 text-xs text-red-500">{errors.especie}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Raza</label>
                                <input
                                    type="text"
                                    name="raza"
                                    value={data.raza}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-indigo-400"
                                />
                                {errors.raza && <p className="mt-1 text-xs text-red-500">{errors.raza}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Edad (en meses)</label>
                                <input
                                    type="number"
                                    name="edad"
                                    value={data.edad}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-indigo-400"
                                    min={0}
                                />
                                {errors.edad && <p className="mt-1 text-xs text-red-500">{errors.edad}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={data.descripcion}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-indigo-400"
                                rows={4}
                            />
                            {errors.descripcion && <p className="mt-1 text-xs text-red-500">{errors.descripcion}</p>}
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                            <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">Foto de la mascota</label>
                            <div className="flex flex-col items-center gap-6 md:flex-row">
                                <input
                                    type="file"
                                    name="imagen"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300"
                                    ref={fileInputRef}
                                    required
                                />
                                {preview && (
                                    <div className="mt-4 md:mt-0">
                                        <img
                                            src={preview}
                                            alt="Vista previa"
                                            className="max-h-40 rounded-xl border-4 border-white object-cover shadow-lg dark:border-gray-600"
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.imagen && <p className="mt-2 text-xs text-red-500">{errors.imagen}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full transform rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:from-indigo-700 hover:to-pink-600 disabled:scale-100 disabled:opacity-50"
                        >
                            {processing ? 'Registrando...' : 'Registrar Mascota'}
                        </button>
                    </form>
                </div>
            </main>
        </AppLayout>
    );
}
