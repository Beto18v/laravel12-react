import React from 'react';
import AppLayout from '../../layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function RegistrarMascota() {
  const { data, setData, post, processing, errors } = useForm<{
    nombre: string;
    especie: string;
    edad: string;
    imagen: File | null;
  }>({
    nombre: '',
    especie: '',
    edad: '',
    imagen: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    post('/mascotas/store', {
      forceFormData: true,
    });
  };

  return (
    <AppLayout>
      <Head title="Registrar Mascota" />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded space-y-6">
        <h1 className="text-2xl font-bold text-center">Registrar una nueva mascota</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre de la mascota</label>
            <input
              type="text"
              name="nombre"
              value={data.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Especie</label>
            <input
              type="text"
              name="especie"
              value={data.especie}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Edad (en meses)</label>
            <input
              type="number"
              name="edad"
              value={data.edad}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Foto de la mascota</label>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded w-full"
          >
            Registrar Mascota
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
