import React, { useState } from 'react';
import AppLayout from '../../layouts/app-layout';
import { Head } from '@inertiajs/react';

type Producto = {
  id: number;
  nombre: string;
  tipo: 'producto' | 'mascota';
  descripcion: string;
  precio: number;
};

const mockProductos: Producto[] = [
  { id: 1, nombre: 'Collar para perro', tipo: 'producto', descripcion: 'Cuero ajustable', precio: 25000 },
  { id: 2, nombre: 'Gato siamés', tipo: 'mascota', descripcion: '2 meses, vacunado', precio: 200000 },
  { id: 3, nombre: 'Comida para gatos', tipo: 'producto', descripcion: '1kg sabor salmón', precio: 32000 },
  { id: 4, nombre: 'Perro bulldog', tipo: 'mascota', descripcion: '6 meses, sociable', precio: 350000 },
];

export default function ProductosMascotas() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<'todo' | 'producto' | 'mascota'>('todo');

  const productosFiltrados = mockProductos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = filtro === 'todo' || producto.tipo === filtro;
    return coincideBusqueda && coincideTipo;
  });

  return (
    <AppLayout>
      <Head title="Productos y Mascotas" />

      <div className="p-6 space-y-6">
        {/* Mensaje informativo */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded shadow">
          <p className="font-semibold">¿Por qué comprar desde aquí?</p>
          <p className="text-sm">
            Al comprar productos y mascotas en la plataforma, accedes a beneficios como trazabilidad, seguridad
            y una cuota moderadora reducida para servicios veterinarios.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full md:w-1/2 p-2 border rounded"
          />
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as 'todo' | 'producto' | 'mascota')}
            className="p-2 border rounded"
          >
            <option value="todo">Todos</option>
            <option value="producto">Solo productos</option>
            <option value="mascota">Solo mascotas</option>
          </select>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosFiltrados.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">{item.nombre}</h2>
              <p className="text-gray-600 text-sm">{item.descripcion}</p>
              <p className="text-green-600 font-bold mt-2">$ {item.precio.toLocaleString()}</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center text-gray-500">No se encontraron resultados.</div>
        )}
      </div>
    </AppLayout>
  );
}
