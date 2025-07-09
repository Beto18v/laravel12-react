import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Heart, ShieldCheck } from 'lucide-react';

interface PetCardProps {
    id: number;
    name: string;
    especie: string;
    raza?: string;
    edad: number;
    descripcion: string;
    imageUrl: string;
    shelter: string;
}

export default function PetCard({ name, especie, raza, edad, descripcion, imageUrl, shelter }: PetCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
            <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">Ver mascota</span>
            </Link>
            <img src={imageUrl} alt={name} width={400} height={300} className="h-60 w-full object-cover transition-all group-hover:scale-105" />
            <div className="bg-white p-4 dark:bg-gray-900">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {especie} {raza && `• ${raza}`}
                        </p>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {edad} {edad === 1 ? 'año' : 'años'}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{descripcion}</p>

                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ShieldCheck className="mr-1.5 h-4 w-4 text-green-500" />
                            <span className="text-blue-600 dark:text-blue-400">Publicado por: {shelter}</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-20">
                        <Heart className="h-5 w-5 text-gray-500 hover:fill-red-500 hover:text-red-500" />
                    </Button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Disponible para adopción</p>
                    <Button size="sm" className="z-20 bg-green-600 hover:bg-green-700">
                        Adoptar
                    </Button>
                </div>
            </div>
        </div>
    );
}
