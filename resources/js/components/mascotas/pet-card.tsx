import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { Heart, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import FormularioAdopcion from '@/pages/Dashboard/VerMascotasProductos/components/formulario-adopcion';

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

export default function PetCard(props: PetCardProps) {
    const { auth } = usePage().props as any;
    const [showAdoptionModal, setShowAdoptionModal] = useState(false);

    const handleAdoptClick = async () => {
        if (!auth?.user || auth.user.role !== 'cliente') {
            // Guardar la URL de destino en la sesión antes de redirigir
            const intendedUrl = route('productos.mascotas') + `?adoptar_mascota=${props.id}`;
            await fetch(route('set-intended-url'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || ''
                },
                body: JSON.stringify({ url: intendedUrl })
            });
            window.location.href = route('register', { role: 'cliente' });
            return;
        }
        setShowAdoptionModal(true);
    };

    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
            <Link href="#" className="absolute inset-0 z-10">
                <span className="sr-only">Ver mascota</span>
            </Link>
            <img src={props.imageUrl} alt={props.name} width={400} height={300} className="h-60 w-full object-cover transition-all group-hover:scale-105" />
            <div className="bg-white p-4 dark:bg-gray-900">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {props.especie} {props.raza && `• ${props.raza}`}
                        </p>
                        <h3 className="text-lg font-semibold">{props.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {props.edad} {props.edad === 1 ? 'año' : 'años'}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{props.descripcion}</p>

                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ShieldCheck className="mr-1.5 h-4 w-4 text-green-500" />
                            <span className="text-blue-600 dark:text-blue-400">Publicado por: {props.shelter}</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-20">
                        <Heart className="h-5 w-5 text-gray-500 hover:fill-red-500 hover:text-red-500" />
                    </Button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Disponible para adopción</p>
                    <Button size="sm" className="z-20 bg-green-600 hover:bg-green-700" onClick={handleAdoptClick}>
                        Adoptar
                    </Button>
                </div>
            </div>
            {/* Modal de adopción */}
            {showAdoptionModal && (
                <FormularioAdopcion
                    mascota={{
                        id: props.id,
                        nombre: props.name,
                        tipo: 'mascota',
                    }}
                    show={showAdoptionModal}
                    onClose={() => setShowAdoptionModal(false)}
                />
            )}
        </div>
    );
}
