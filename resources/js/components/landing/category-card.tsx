import { Link } from '@inertiajs/react';

interface CategoryCardProps {
    emoji: string;
    title: string;
    count: string;
    link: string;
}

export default function CategoryCard({ emoji, title, count, link }: CategoryCardProps) {
    return (
        <Link
            href={link}
            className="category-card dark:shadow-dark transform rounded-lg bg-white p-6 text-center shadow-md transition hover:scale-105 dark:bg-gray-700"
        >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-3xl">{emoji}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">+{count} disponibles</p>
        </Link>
    );
}
