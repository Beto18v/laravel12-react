import CategoryCard from './category-card';

interface Category {
    emoji: string;
    title: string;
    count: string;
    link: string;
}

export default function CategoriesSection({ categories }: { categories: Category[] }) {
    return (
        <section className="bg-white py-16 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white">Explora por categoría</h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
