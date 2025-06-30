import React, { useState } from 'react';
import AppLayout from '../../layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

type ProductoMascota = {
  id: number;
  nombre: string;
  tipo: 'producto' | 'mascota';
  descripcion: string;
  precio: number;
  user?: { name: string };
};

export default function ProductosMascotas() {
  const items = (usePage().props.items ?? []) as ProductoMascota[];
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<'todo' | 'producto' | 'mascota'>('todo');
  const [mensaje, setMensaje] = useState<string | null>(null);

  const productosFiltrados = items.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = filtro === 'todo' || producto.tipo === filtro;
    return coincideBusqueda && coincideTipo;
  });

  // Simulación de feedback visual al "comprar" o "adoptar"
  const handleAccion = (item: ProductoMascota) => {
    setMensaje(
      item.tipo === 'producto'
        ? `¡Has solicitado comprar el producto "${item.nombre}"! Pronto te contactaremos.`
        : `¡Has solicitado adoptar a "${item.nombre}"! Pronto te contactaremos.`
    );
    setTimeout(() => setMensaje(null), 3500);
  };

  return (
    <AppLayout>
      <Head title="Productos y Mascotas" />
      <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Mensaje informativo */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded shadow flex items-center gap-3 animate-fade-in">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold">¿Por qué comprar desde aquí?</p>
            <p className="text-sm">
              Al comprar productos y mascotas en la plataforma, accedes a beneficios como trazabilidad, seguridad
              y una cuota moderadora reducida para servicios veterinarios.
            </p>
          </div>
        </div>
        {/* Feedback visual */}
        {mensaje && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded shadow text-center animate-fade-in">
            {mensaje}
          </div>
        )}
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full md:w-1/2 p-2 border-2 border-blue-200 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as 'todo' | 'producto' | 'mascota')}
            className="p-2 border-2 border-blue-200 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="todo">Todos</option>
            <option value="producto">Solo productos</option>
            <option value="mascota">Solo mascotas</option>
          </select>
        </div>
        {/* Productos y Mascotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productosFiltrados.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center border border-blue-100 transform hover:scale-105 hover:border-blue-300 group relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${
                    item.tipo === 'producto'
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-pink-100 text-pink-700 border-pink-200'
                  } animate-fade-in`}
                >
                  {item.tipo === 'producto' ? 'Producto' : 'Mascota'}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-blue-700 mb-1 text-center group-hover:underline">
                {item.nombre}
              </h2>
              <p className="text-gray-600 text-sm text-center mb-2 line-clamp-3">{item.descripcion}</p>
              <p className="text-green-600 font-bold mt-2 text-lg">
                {item.precio !== undefined && item.precio !== null && item.tipo === 'producto'
                  ? `$ ${item.precio.toLocaleString()}`
                  : item.tipo === 'mascota'
                  ? <span className="text-gray-400 italic">Sin precio</span>
                  : <span className="text-gray-400 italic">Precio no disponible</span>}
              </p>
              <p className="text-xs text-gray-500 mt-1 mb-2">
                Publicado por:{' '}
                <span className="font-semibold text-blue-400">{item.user?.name || 'Aliado'}</span>
              </p>
              <button
                className="mt-auto px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={() => handleAccion(item)}
              >
                {item.tipo === 'producto' ? 'Comprar' : 'Adoptar'}
              </button>
            </div>
          ))}
        </div>
        {productosFiltrados.length === 0 && (
          <div className="text-center text-gray-500 text-lg py-16 animate-fade-in">
            No se encontraron resultados.
          </div>
        )}
      </div>
    </AppLayout>
  );
}
