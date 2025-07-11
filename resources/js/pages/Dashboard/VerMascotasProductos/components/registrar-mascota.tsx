// resources/js/pages/Dashboard/VerMascotasProductos/components/registrar-mascota.tsx
// Componente modal para registrar nuevas mascotas con sistema de múltiples imágenes (hasta 3)

import { useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react'; // Iconos para agregar y eliminar imágenes
import React, { useEffect, useRef, useState } from 'react';

interface RegistrarMascotaProps {
    isOpen: boolean;
    onClose: () => void;
    setMensaje: (mensaje: string) => void;
}

export default function RegistrarMascota({ isOpen, onClose, setMensaje }: RegistrarMascotaProps) {
    // Form handler con todos los campos de mascota, incluyendo array de imágenes
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        especie: '',
        raza: '',
        fecha_nacimiento: '',
        sexo: '',
        ciudad: '',
        descripcion: '',
        imagenes: [] as File[], // Array para múltiples imágenes
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const multipleFileInputRef = useRef<HTMLInputElement>(null);
    // Estados para manejar las imágenes y sus previews
    const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    // Estado para mostrar edad calculada
    const [edadCalculada, setEdadCalculada] = useState<string>('');

    // Función para calcular edad basada en fecha de nacimiento
    const calcularEdad = (fechaNacimiento: string) => {
        if (!fechaNacimiento) {
            setEdadCalculada('');
            return;
        }

        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);

        if (nacimiento > hoy) {
            setEdadCalculada('Fecha inválida');
            return;
        }

        let años = hoy.getFullYear() - nacimiento.getFullYear();
        const meses = hoy.getMonth() - nacimiento.getMonth();

        if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
            años--;
        }

        // Calcular meses exactos
        const fechaTemporal = new Date(nacimiento);
        fechaTemporal.setFullYear(nacimiento.getFullYear() + años);
        const mesesRestantes = Math.floor((hoy.getTime() - fechaTemporal.getTime()) / (1000 * 60 * 60 * 24 * 30.44));

        if (años > 0) {
            setEdadCalculada(
                años === 1
                    ? `1 año${mesesRestantes > 0 ? ` y ${mesesRestantes} ${mesesRestantes === 1 ? 'mes' : 'meses'}` : ''}`
                    : `${años} años${mesesRestantes > 0 ? ` y ${mesesRestantes} ${mesesRestantes === 1 ? 'mes' : 'meses'}` : ''}`,
            );
        } else {
            const mesesTotales = Math.floor((hoy.getTime() - nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
            setEdadCalculada(mesesTotales === 1 ? '1 mes' : `${mesesTotales} meses`);
        }
    };

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
        // Envía datos con forceFormData para manejar archivos correctamente
        post('/mascotas/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setAdditionalFiles([]);
                setImagePreviews([]);
                setEdadCalculada('');
                onClose();
                setMensaje('¡Mascota registrada exitosamente!');
            },
            onError: (errors) => {
                setMensaje('Error al registrar mascota. Revisa los datos e intenta nuevamente.');
                // Limpia imágenes después de 3 segundos si hay error
                setTimeout(() => {
                    setData('imagenes', []);
                }, 3000);
            },
        });
    };

    // Resetea las imágenes y edad calculada al cerrar el modal
    useEffect(() => {
        if (!isOpen) {
            setAdditionalFiles([]);
            setImagePreviews([]);
            setEdadCalculada('');
            reset();
        }
    }, [isOpen]);

    // Función para manejar múltiples imágenes (máximo 3)
    const handleAddImages = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files);
        const availableSlots = 3 - additionalFiles.length; // Calcula espacios disponibles
        const filesToAdd = newFiles.slice(0, availableSlots);

        if (filesToAdd.length > 0) {
            const updatedFiles = [...additionalFiles, ...filesToAdd];
            setAdditionalFiles(updatedFiles);
            setData('imagenes', updatedFiles);

            // Genera previews para las nuevas imágenes
            filesToAdd.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreviews((prev) => [...prev, e.target?.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Elimina una imagen específica del array
    const removeImage = (indexToRemove: number) => {
        const updatedFiles = additionalFiles.filter((_, index) => index !== indexToRemove);
        const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);

        setAdditionalFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
        setData('imagenes', updatedFiles);

        // Reset del input para permitir reseleccionar archivos
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

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Campo Fecha de Nacimiento */}
                        <div>
                            <label htmlFor="fecha_nacimiento" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Fecha de Nacimiento
                            </label>
                            <input
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                type="date"
                                value={data.fecha_nacimiento}
                                onChange={(e) => {
                                    setData('fecha_nacimiento', e.target.value);
                                    calcularEdad(e.target.value);
                                }}
                                max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
                                className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.fecha_nacimiento && <p className="mt-1 text-sm text-red-600">{errors.fecha_nacimiento}</p>}
                        </div>

                        {/* Campo Edad Calculada (solo lectura) */}
                        <div>
                            <label htmlFor="edad_calculada" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Edad Actual
                            </label>
                            <input
                                id="edad_calculada"
                                name="edad_calculada"
                                type="text"
                                value={edadCalculada}
                                readOnly
                                placeholder="Se calculará automáticamente"
                                className="w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-50 p-3 text-gray-600 shadow-sm dark:border-gray-600 dark:bg-gray-600 dark:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
