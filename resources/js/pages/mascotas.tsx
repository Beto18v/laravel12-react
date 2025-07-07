import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';

import PetCard from '@/components/mascotas/pet-card';
import PetHero from '@/components/mascotas/pet-hero';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface Mascota {
    id: number;
    nombre: string;
    especie: string;
    raza?: string;
    edad: number;
    descripcion: string;
    imagen?: string;
    user: {
        id: number;
        name: string;
    };
}

interface MascotasProps {
    mascotas: Mascota[];
}

export default function Mascotas({ mascotas = [] }: MascotasProps) {
    // Transformar las mascotas de la base de datos al formato esperado por los componentes
    const allPets = useMemo(() => {
        return mascotas.map(mascota => ({
            id: mascota.id,
            name: mascota.nombre,
            especie: mascota.especie,
            raza: mascota.raza,
            edad: mascota.edad,
            descripcion: mascota.descripcion,
            imageUrl: mascota.imagen ? `/storage/${mascota.imagen}` : 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=400',
            shelter: mascota.user.name
        }));
    }, [mascotas]);

    const [filters, setFilters] = useState({
        searchTerm: '',
        selectedEspecie: 'all',
        selectedEdad: 'all',
    });

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredPets = useMemo(() => {
        return allPets.filter((pet) => {
            const searchTermMatch = pet.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                                  pet.descripcion.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const especieMatch = filters.selectedEspecie === 'all' || pet.especie === filters.selectedEspecie;
            const edadMatch = filters.selectedEdad === 'all' || 
                            (filters.selectedEdad === 'joven' && pet.edad <= 2) ||
                            (filters.selectedEdad === 'adulto' && pet.edad > 2 && pet.edad <= 7) ||
                            (filters.selectedEdad === 'senior' && pet.edad > 7);
            return searchTermMatch && especieMatch && edadMatch;
        });
    }, [filters, allPets]);

    // Obtener especies únicas para filtros
    const availableEspecies = useMemo(() => {
        return Array.from(new Set(allPets.map(pet => pet.especie)));
    }, [allPets]);

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gray-800">
            <Head title="Mascotas" />
            <Header />
            <PetHero />
            
            <main className="flex-1">
                <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                    {/* Filtros simples */}
                    <div className="mb-8 flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Buscar mascotas..."
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        
                        <select
                            value={filters.selectedEspecie}
                            onChange={(e) => handleFilterChange('selectedEspecie', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="all">Todas las especies</option>
                            {availableEspecies.map(especie => (
                                <option key={especie} value={especie}>{especie}</option>
                            ))}
                        </select>

                        <select
                            value={filters.selectedEdad}
                            onChange={(e) => handleFilterChange('selectedEdad', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="all">Todas las edades</option>
                            <option value="joven">Joven (0-2 años)</option>
                            <option value="adulto">Adulto (3-7 años)</option>
                            <option value="senior">Senior (8+ años)</option>
                        </select>
                    </div>

                    {/* Grid de mascotas */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredPets.length > 0 ? (
                            filteredPets.map((pet) => <PetCard key={pet.id} {...pet} />)
                        ) : (
                            <p className="col-span-full py-16 text-center text-gray-500">
                                {allPets.length === 0 
                                    ? 'No hay mascotas disponibles para adopción aún.' 
                                    : 'No se encontraron mascotas con estos filtros.'
                                }
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <ThemeSwitcher />
        </div>
    );
}