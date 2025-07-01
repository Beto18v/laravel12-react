import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import ProductCard from '@/components/productos/product-card';
import ProductFilters from '@/components/productos/product-filters';
import ProductHero from '@/components/productos/product-hero'; // 1. Importa el nuevo componente
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

// --- Datos de ejemplo ---
const allProducts = [
    {
        id: 1,
        name: 'Collar de Cuero',
        category: 'Accesorios',
        price: 25000,
        imageUrl: 'https://images.unsplash.com/photo-1591946614725-3b9b0d5b248b?q=80&w=400',
    },
    {
        id: 2,
        name: 'Juguete para Gato',
        category: 'Juguetes',
        price: 15000,
        imageUrl: 'https://images.unsplash.com/photo-1592769606236-4445855016a9?q=80&w=400',
    },
    {
        id: 3,
        name: 'Comida para Perro 10kg',
        category: 'Alimentos',
        price: 80000,
        imageUrl: 'https://images.unsplash.com/photo-1585856346416-28a1b9204273?q=80&w=400',
    },
    {
        id: 4,
        name: 'Cama Suave Mediana',
        category: 'Camas',
        price: 120000,
        imageUrl: 'https://images.unsplash.com/photo-1580477880199-6769f52c1538?q=80&w=400',
    },
    {
        id: 5,
        name: 'Arena para Gato',
        category: 'Higiene',
        price: 45000,
        imageUrl: 'https://images.unsplash.com/photo-1620143165323-e19c96841b5a?q=80&w=400',
    },
    {
        id: 6,
        name: 'Correa Retráctil',
        category: 'Accesorios',
        price: 55000,
        imageUrl: 'https://images.unsplash.com/photo-1605347257448-382994a53944?q=80&w=400',
    },
];

const availableFilters = {
    categories: ['Accesorios', 'Juguetes', 'Alimentos', 'Camas', 'Higiene'],
    priceRange: [0, 150000] as [number, number],
};

export default function Productos() {
    const [filters, setFilters] = useState({
        searchTerm: '',
        selectedCategory: 'all',
        priceLimit: availableFilters.priceRange[1],
    });

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            const searchTermMatch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const categoryMatch = filters.selectedCategory === 'all' || product.category === filters.selectedCategory;
            const priceMatch = product.price <= filters.priceLimit;
            return searchTermMatch && categoryMatch && priceMatch;
        });
    }, [filters]);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <Head title="Productos" />
            <Header />

            {/* 2. El <main> ahora empieza directamente con el Hero */}
            <main className="flex-1">
                <ProductHero />

                {/* 3. El resto del contenido va debajo del Hero */}
                <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <aside className="lg:col-span-1">
                            <ProductFilters filters={availableFilters} onFilterChange={handleFilterChange} currentPriceLimit={filters.priceLimit} />
                        </aside>
                        <section className="lg:col-span-3">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => <ProductCard key={product.id} {...product} />)
                                ) : (
                                    <p className="col-span-full py-16 text-center text-gray-500">No se encontraron productos con estos filtros.</p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
