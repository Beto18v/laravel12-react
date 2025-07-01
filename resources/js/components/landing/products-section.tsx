import ProductCard from './product-card';

interface Product {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

export default function ProductsSection({ products }: { products: Product[] }) {
    return (
        <section className="bg-gray-50 py-16 dark:bg-gray-700">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white">Productos y servicios para tu mascota</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
