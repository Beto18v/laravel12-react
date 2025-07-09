// resources/js/components/comunidad/post-filters.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListFilter } from 'lucide-react';

export default function PostFilters() {
    const categories = ['Todas', 'Campañas', 'Noticias', 'Consejos', 'Eventos'];

    return (
        <div className="sticky top-24 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
            <h3 className="mb-4 flex items-center text-lg font-bold">
                <ListFilter className="mr-2 h-5 w-5" />
                Filtrar Publicaciones
            </h3>
            <div className="mb-6">
                <Input placeholder="Buscar por palabra clave..." />
            </div>
            <div className="space-y-2">
                <p className="font-semibold">Categorías</p>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    );
}
