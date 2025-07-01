import { Link } from '@inertiajs/react';

interface ProductCardProps {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

export default function ProductCard({ name, description, price, imageUrl }: ProductCardProps) {
    return (
        <div className="product-card dark:shadow-dark overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl dark:bg-gray-700">
            <img src={imageUrl} alt={name} className="h-48 w-full object-cover" loading="lazy" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">{description}</p>
                <p className="mb-4 font-bold text-blue-600 dark:text-blue-400">{price}</p>
                <Link
                    href="/productos"
                    className="block w-full rounded-lg bg-green-600 py-2 text-center text-white transition hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                >
                    Ver más
                </Link>
            </div>
        </div>
    );
}
