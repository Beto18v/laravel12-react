import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const productList = [
  {
    name: 'Cama suave para perro',
    description: 'Material hipoalergénico, lavable, antialérgico y pensado para el descanso profundo de tu mascota.',
    price: '$85.000',
    category: 'Accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1619983081563-e1ab83d713b3?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Arena para gatos 10kg',
    description: 'Absorción avanzada, sin olor y amigable con el ambiente. Ideal para gatos exigentes.',
    price: '$45.000',
    category: 'Higiene',
    imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Pechera ajustable para perro',
    description: 'Diseñada para comodidad, seguridad y estilo. Ajuste ergonómico para todas las razas.',
    price: '$30.000',
    category: 'Accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1604908553982-792547b45382?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Cepillo removedor de pelo',
    description: 'Elimina pelo suelto y reduce el estrés con suaves masajes durante el cepillado.',
    price: '$18.000',
    category: 'Higiene',
    imageUrl: 'https://images.unsplash.com/photo-1614210299370-0413f38aef4e?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Pelota interactiva',
    description: 'Favorece el ejercicio, reduce ansiedad y fortalece el vínculo mascota-humano.',
    price: '$22.500',
    category: 'Juguetes',
    imageUrl: 'https://images.unsplash.com/photo-1621891119516-678bcc40f504?auto=format&fit=crop&w=800&q=60',
  },
];

export default function Productos() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredProducts = productList.filter(product => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === '' || product.category === category)
    );
  });

  const uniqueCategories = [...new Set(productList.map(p => p.category))];

  return (
    <>
      <Head title="Productos y Servicios" />
      <div className="min-h-screen bg-gradient-to-b from-blue-200 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-16">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white/90 backdrop-blur px-6 py-4 shadow-md dark:bg-gray-950/80">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = route('home')}>
            <img src="/Logo/Logo.png" alt="AdoptaFácil logo" className="block h-10 dark:hidden" />
            <img src="/Logo/LogoWhite.png" alt="AdoptaFácil logo dark" className="hidden h-10 dark:block" />
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">ADOPTAFÁCIL</span>
          </div>
          <div className="space-x-3">
            <Link href="/register?role=cliente" className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
              Quiero comprar
            </Link>
            <Link href="/register?role=aliado" className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700">
              Quiero vender
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 pt-10">
          <h1 className="mb-4 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-300">
            Productos y servicios para tu mascota 🐾
          </h1>
          <p className="mb-10 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Este módulo nace como una solución circular y de financiamiento sostenible para apoyar a nuestros refugios aliados. El 20% de cada compra se destina directamente a ellos, ayudando a cubrir necesidades básicas y emergencias. Cada compra es una forma de ayudar.
          </p>

          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Todas las categorías</option>
              {uniqueCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No se encontraron productos.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg transition-all dark:border-gray-700 dark:bg-gray-800 ${expandedIndex === index ? 'z-10 scale-105 ring-4 ring-blue-300' : 'hover:shadow-xl'}`}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {expandedIndex === index ? product.description : product.description.substring(0, 40) + '...'}
                    </p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{product.price}</p>
                    {expandedIndex === index && (
                      <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-100">
                        <p><strong>Categoría:</strong> {product.category}</p>
                        <p className="mt-2 italic text-blue-500 dark:text-blue-300">Con tu compra ayudas al sostenimiento de refugios aliados 💙</p>
                      </div>
                    )}
                    <Link
                      href="/register?role=cliente"
                      onClick={e => e.stopPropagation()}
                      className="mt-4 block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-medium text-white transition hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
