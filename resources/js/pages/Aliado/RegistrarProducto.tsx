import React from 'react';
import AppLayout from '../../layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

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
    post('/productos/store', {
      forceFormData: true,
    });
  };

  return (
    <AppLayout>
      <Head title="Registrar Producto" />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded space-y-6">
        <h1 className="text-2xl font-bold text-center">Registrar un nuevo producto</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre del producto</label>
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
            <label className="block font-medium">Descripción</label>
            <textarea
              name="descripcion"
              value={data.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Precio (COP)</label>
            <input
              type="number"
              name="precio"
              value={data.precio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Imagen del producto</label>
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
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
          >
            Registrar Producto
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
