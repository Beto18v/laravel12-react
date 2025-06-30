import React, { useRef, useState } from 'react';
import AppLayout from '../../layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <AppLayout>
      <Head title="Registrar Mascota" />
      <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-indigo-50 to-pink-50 py-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight drop-shadow">Registrar una nueva mascota</h1>
          {mensajeExito && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded shadow text-center mb-6 animate-fade-in">
              {mensajeExito}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={data.nombre}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 shadow-sm"
                  required
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Especie</label>
                <input
                  type="text"
                  name="especie"
                  value={data.especie}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 shadow-sm"
                  required
                />
                {errors.especie && <p className="text-red-500 text-xs mt-1">{errors.especie}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Raza</label>
                <input
                  type="text"
                  name="raza"
                  value={data.raza}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 shadow-sm"
                />
                {errors.raza && <p className="text-red-500 text-xs mt-1">{errors.raza}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Edad (en meses)</label>
                <input
                  type="number"
                  name="edad"
                  value={data.edad}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 shadow-sm"
                  min={0}
                />
                {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad}</p>}
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Descripción</label>
              <textarea
                name="descripcion"
                value={data.descripcion}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 shadow-sm"
                rows={3}
              />
              {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-gray-700">Foto de la mascota</label>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 shadow-sm"
                  ref={fileInputRef}
                  required
                />
                {errors.imagen && <p className="text-red-500 text-xs mt-1">{errors.imagen}</p>}
              </div>
              {preview && (
                <div className="flex-1 flex justify-center">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="mt-3 rounded-xl shadow-lg max-h-48 border border-gray-200 object-cover"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={processing}
              className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl w-full font-bold shadow-lg transition-all duration-200"
            >
              {processing ? 'Registrando...' : 'Registrar Mascota'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
