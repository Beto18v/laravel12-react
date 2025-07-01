import PetCard from './pet-card';

// Definimos la interfaz para el array de mascotas
interface Pet {
    name: string;
    breed: string;
    age: string;
    description: string;
    imageUrl: string;
}

export default function PetsSection({ pets }: { pets: Pet[] }) {
    return (
        <section className="bg-gray-50 py-16 dark:bg-gray-700">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white">Mascotas disponibles</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pets.map((pet, index) => (
                        <PetCard key={index} {...pet} />
                    ))}
                </div>
            </div>
        </section>
    );
}
