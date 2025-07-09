import ComunityHero from '@/components/comunidad/comunity-hero';
import CreatePost from '@/components/comunidad/create-post';
import PostCard from '@/components/comunidad/post-card';
import PostFilters from '@/components/comunidad/post-filters';
import TrendingTopics from '@/components/comunidad/trending-topics';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Head } from '@inertiajs/react';

// Datos de ejemplo para las publicaciones
const samplePosts = [
    {
        id: 1,
        author: {
            name: 'Fundación Huellitas Felices',
            avatarUrl: 'https://i.pravatar.cc/150?u=huellitasfelices',
        },
        timestamp: 'hace 2 horas',
        content:
            '¡Gran jornada de esterilización este fin de semana! 🐾 Ayúdanos a controlar la sobrepoblación y a mejorar la calidad de vida de nuestros amigos peludos. Tendremos precios especiales y contaremos con el apoyo de veterinarios expertos. ¡No faltes!',
        imageUrl: 'https://images.unsplash.com/photo-1549483363-1c8b7be41523?q=80&w=870&auto=format&fit=crop',
        likes: 125,
        comments: 12,
        category: 'Campaña',
    },
    {
        id: 2,
        author: {
            name: 'AdoptaFácil Admin',
            avatarUrl: 'https://i.pravatar.cc/150?u=adoptafaciladmin',
        },
        timestamp: 'hace 1 día',
        content:
            '¡Bienvenidos a nuestra nueva sección de Comunidad! ✨ Este es un espacio para conectar, compartir y colaborar por el bienestar de los animales. ¡Esperamos ver sus publicaciones pronto!',
        likes: 350,
        comments: 45,
        category: 'Noticia',
    },
    {
        id: 3,
        author: {
            name: 'Veterinaria El Arca',
            avatarUrl: 'https://i.pravatar.cc/150?u=elarca',
        },
        timestamp: 'hace 3 días',
        content:
            'Consejo del día: ¿Sabías que el cepillado regular no solo mantiene el pelaje de tu mascota sano, sino que también fortalece su vínculo contigo? 🐕❤️',
        likes: 88,
        comments: 5,
        category: 'Consejo',
    },
];

export default function Comunidad() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-800">
            <Head title="Comunidad" />
            <Header />
            <ComunityHero />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Filtros a la izquierda (3 de 12 columnas) */}
                        <aside className="lg:col-span-3">
                            <PostFilters />
                        </aside>
                        {/* Feed de publicaciones (6 de 12 columnas, el área central) */}
                        <section className="space-y-8 lg:col-span-6">
                            <CreatePost />
                            <div className="space-y-6">
                                {samplePosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </section>
                        {/* Tendencias a la derecha (3 de 12 columnas) */}
                        <aside className="hidden lg:col-span-3 lg:block">
                            <TrendingTopics />
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
            <ThemeSwitcher />
        </div>
    );
}
