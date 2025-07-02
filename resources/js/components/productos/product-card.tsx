import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Heart } from 'lucide-react';

interface ProductCardProps {
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
}

export default function ProductCard({ name, category, price, imageUrl }: ProductCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
            <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">Ver producto</span>
            </Link>
            <img src={imageUrl} alt={name} width={400} height={300} className="h-60 w-full object-cover transition-all group-hover:scale-105" />
            <div className="bg-white p-4 dark:bg-gray-950">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
                        <h3 className="text-lg font-semibold">{name}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-20">
                        <Heart className="h-5 w-5 text-gray-500 hover:fill-red-500 hover:text-red-500" />
                    </Button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold">${price.toLocaleString('es-CO')}</p>
                    <Button size="sm" className="z-20">
                        Agregar al carrito
                    </Button>
                </div>
            </div>
        </div>
    );
}
