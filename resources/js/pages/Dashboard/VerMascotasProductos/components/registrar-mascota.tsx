// resources/js/pages/Dashboard/VerMascotasProductos/components/registrar-mascota.tsx

import { useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react'; // Importar los iconos
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
        imagenes: [] as File[],
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const multipleFileInputRef = useRef<HTMLInputElement>(null);
    const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
                setAdditionalFiles([]);
                setImagePreviews([]);
                onClose();
                setMensaje('¡Mascota registrada exitosamente!');
            },
            onError: () => {
                setTimeout(() => {
                    setData('imagenes', []);
                }, 3000);
            },
        });
    };

    // Resetea las imágenes al cerrar el modal
    useEffect(() => {
        if (!isOpen) {
            setAdditionalFiles([]);
            setImagePreviews([]);
            reset();
        }
    }, [isOpen]);

    // Función para agregar imágenes adicionales
    const handleAddImages = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files);
        const availableSlots = 3 - additionalFiles.length;
        const filesToAdd = newFiles.slice(0, availableSlots);

        if (filesToAdd.length > 0) {
            const updatedFiles = [...additionalFiles, ...filesToAdd];
            setAdditionalFiles(updatedFiles);
            setData('imagenes', updatedFiles);

            // Crear previews para las nuevas imágenes
            filesToAdd.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreviews((prev) => [...prev, e.target?.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Función para eliminar una imagen específica
    const removeImage = (indexToRemove: number) => {
        const updatedFiles = additionalFiles.filter((_, index) => index !== indexToRemove);
        const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);

        setAdditionalFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
        setData('imagenes', updatedFiles);

        // Resetear el input file para permitir seleccionar las mismas imágenes otra vez
        if (multipleFileInputRef.current) {
            multipleFileInputRef.current.value = '';
        }
    };

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

                    {/* Campo Imágenes (hasta 3) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Imágenes de la mascota (hasta 3)</label>

                        {/* Vista previa de imágenes seleccionadas */}
                        {imagePreviews.length > 0 && (
                            <div className="mb-4 grid grid-cols-3 gap-3">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="group relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="h-20 w-full rounded-md border border-gray-300 object-cover dark:border-gray-600"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                        <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 truncate rounded-b-md bg-black p-1 text-xs text-white">
                                            {additionalFiles[index]?.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Botón para agregar imágenes (solo si no se ha llegado al límite) */}
                        {additionalFiles.length < 3 && (
                            <label
                                htmlFor="imagenes-mascota"
                                className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                <Plus className="h-10 w-10 text-gray-400" />
                                <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    {additionalFiles.length === 0
                                        ? 'Seleccionar imágenes de la mascota'
                                        : `Agregar más imágenes (${3 - additionalFiles.length} disponibles)`}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hasta 2MB cada una</span>
                            </label>
                        )}

                        <input
                            id="imagenes-mascota"
                            name="imagenes-mascota"
                            ref={multipleFileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            autoComplete="off"
                            onChange={(e) => handleAddImages(e.target.files)}
                            className="hidden"
                        />

                        {errors.imagenes && <p className="mt-1 text-sm text-red-600">{errors.imagenes}</p>}
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
