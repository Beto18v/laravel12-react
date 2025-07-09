// resources/js/pages/Dashboard/VerMascotasProductos/components/registrar-mascota.tsx

import { useForm } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react'; // Importar el icono
import React, { useEffect, useRef, useState } from 'react';

interface RegistrarMascotaProps {
    isOpen: boolean;
    onClose: () => void;
    setMensaje: (mensaje: string) => void;
}

export default function RegistrarMascota({ isOpen, onClose, setMensaje }: RegistrarMascotaProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        sexo: '',
        ciudad: '',
        descripcion: '',
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
        post('/mascotas/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setFileName('');
                onClose();
                setMensaje('¡Mascota registrada exitosamente!');
            },
            onError: () => {
                setTimeout(() => reset('imagen'), 3000);
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
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Registrar Nueva Mascota</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo Nombre */}
                    <div>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            placeholder="Nombre de la mascota"
                            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Campo Especie */}
                        <div>
                            <select
                                id="especie"
                                name="especie"
                                value={data.especie}
                                onChange={(e) => setData('especie', e.target.value)}
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Selecciona una especie</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Conejo">Conejo</option>
                                <option value="Hámster">Hámster</option>
                                <option value="Ave">Ave</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.especie && <p className="mt-1 text-sm text-red-600">{errors.especie}</p>}
                        </div>
                        {/* Campo Raza */}
                        <div>
                            <input
                                id="raza"
                                name="raza"
                                type="text"
                                value={data.raza}
                                onChange={(e) => setData('raza', e.target.value)}
                                placeholder="Raza"
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.raza && <p className="mt-1 text-sm text-red-600">{errors.raza}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {/* Campo Edad */}
                        <div>
                            <input
                                id="edad"
                                name="edad"
                                type="number"
                                value={data.edad}
                                onChange={(e) => setData('edad', e.target.value)}
                                placeholder="Edad (meses)"
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.edad && <p className="mt-1 text-sm text-red-600">{errors.edad}</p>}
                        </div>
                        {/* Campo Sexo */}
                        <div>
                            <select
                                id="sexo"
                                name="sexo"
                                value={data.sexo}
                                onChange={(e) => setData('sexo', e.target.value)}
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Selecciona el sexo</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                            {errors.sexo && <p className="mt-1 text-sm text-red-600">{errors.sexo}</p>}
                        </div>
                        {/* Campo Ciudad */}
                        <div>
                            <input
                                id="ciudad"
                                name="ciudad"
                                type="text"
                                value={data.ciudad}
                                onChange={(e) => setData('ciudad', e.target.value)}
                                placeholder="Ciudad"
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.ciudad && <p className="mt-1 text-sm text-red-600">{errors.ciudad}</p>}
                        </div>
                    </div>

                    {/* Campo Descripción */}
                    <div>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            placeholder="Descripción y personalidad"
                            rows={3}
                            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>}
                    </div>

                    {/* Campo Imagen Personalizado */}
                    <div>
                        <label
                            htmlFor="imagen-mascota"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <UploadCloud className="h-10 w-10 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{fileName || 'Haz clic para subir una foto'}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hasta 2MB</span>
                        </label>
                        <input
                            id="imagen-mascota"
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
                            className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Registrando...' : 'Registrar Mascota'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
