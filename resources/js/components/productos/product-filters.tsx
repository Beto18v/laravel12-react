import { Input } from '@/components/ui/input'; // Usaremos el Input que ya tienes
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductFiltersProps {
    filters: {
        categories: string[];
        priceRange: [number, number];
    };
    onFilterChange: (key: string, value: any) => void;
    currentPriceLimit: number; // Añadimos esta prop para mostrar el valor actual
}

export default function ProductFilters({ filters, onFilterChange, currentPriceLimit }: ProductFiltersProps) {
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-4 text-lg font-semibold">Filtros</h3>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="search">Buscar</Label>
                    <Input id="search" placeholder="Buscar productos..." onChange={(e) => onFilterChange('searchTerm', e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select onValueChange={(value) => onFilterChange('selectedCategory', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {filters.categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-4">
                    {' '}
                    {/* Aumentamos el gap para dar más espacio */}
                    <div className="flex items-center justify-between">
                        <Label htmlFor="price">Precio máximo</Label>
                        {/* Mostramos el valor actual del filtro */}
                        <span className="font-medium text-blue-600 dark:text-blue-400">${currentPriceLimit.toLocaleString('es-CO')}</span>
                    </div>
                    {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
                    <Input
                        id="price"
                        type="range"
                        min={filters.priceRange[0]}
                        max={filters.priceRange[1]}
                        defaultValue={filters.priceRange[1]}
                        step={5000} // Aumentamos el paso para que sea más fácil de usar
                        onChange={(e) => onFilterChange('priceLimit', Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                    />
                </div>
            </div>
        </div>
    );
}
