import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react'; // Importar el icono
import React, { useEffect, useRef, useState } from 'react';

interface RegistrarProductoProps {
    isOpen: boolean;
    onClose: () => void;
    setMensaje: (mensaje: string) => void;
}

export default function RegistrarProducto({ isOpen, onClose, setMensaje }: RegistrarProductoProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: '',
        imagen: null as File | null,
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    // Cierra el modal al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/productos/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setFileName('');
                onClose();
                setMensaje('¡Producto registrado exitosamente!');
                // Recarga solo los datos de 'items'.
                Inertia.reload({ only: ['items'], preserveScroll: true });
            },
            // Se resetea el formulario en caso de error para no dejar datos inválidos
            onError: () => {
                setTimeout(() => reset('imagen'), 3000); // Limpia el campo de imagen si falla
            },
        });
    };

    // Resetea el nombre del archivo al cerrar el modal
    useEffect(() => {
        if (!isOpen) {
            setFileName('');
            reset();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div ref={modalRef} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Registrar Nuevo Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo Nombre */}
                    <div>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            placeholder="Nombre del producto"
                            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                    </div>

                    {/* Campo Descripción */}
                    <div>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            placeholder="Descripción del producto"
                            rows={3}
                            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Campo Precio */}
                        <div>
                            <input
                                type="number"
                                value={data.precio}
                                onChange={(e) => setData('precio', e.target.value)}
                                placeholder="Precio (ej: 25000)"
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.precio && <p className="mt-1 text-sm text-red-600">{errors.precio}</p>}
                        </div>
                        {/* Campo Cantidad */}
                        <div>
                            <input
                                type="number"
                                value={data.cantidad}
                                onChange={(e) => setData('cantidad', e.target.value)}
                                placeholder="Cantidad disponible"
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.cantidad && <p className="mt-1 text-sm text-red-600">{errors.cantidad}</p>}
                        </div>
                    </div>

                    {/* Campo Imagen Personalizado */}
                    <div>
                        <label
                            htmlFor="imagen-producto"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <UploadCloud className="h-10 w-10 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{fileName || 'Haz clic para subir una imagen'}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hasta 2MB</span>
                        </label>
                        <input
                            id="imagen-producto"
                            ref={fileInputRef}
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                setData('imagen', file);
                                setFileName(file ? file.name : '');
                            }}
                            className="hidden"
                        />
                        {errors.imagen && <p className="mt-1 text-sm text-red-600">{errors.imagen}</p>}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-200 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-green-600 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? 'Registrando...' : 'Registrar Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
