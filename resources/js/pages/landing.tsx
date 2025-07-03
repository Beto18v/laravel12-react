import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

// 1. Importa los componentes de sección que acabamos de crear
import CategoriesSection from '@/components/landing/categories-section';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import PetsSection from '@/components/landing/pets-section';
import ProductsSection from '@/components/landing/products-section';

export default function Welcome() {
    const { props } = usePage<SharedData>();

    // 2. Define los datos que se pasarán a los componentes
    const pets = [
        {
            name: 'Max',
            breed: 'Labrador Mix',
            age: '2 años',
            description: 'Juguetón y cariñoso, ideal para familias con niños.',
            imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?fm=jpg&q=60&w=3000',
        },
        {
            name: 'Luna',
            breed: 'Siamés',
            age: '1 año',
            description: 'Tranquila y curiosa, perfecta para apartamentos.',
            imageUrl: 'https://www.shutterstock.com/shutterstock/videos/3611270199/thumb/12.jpg?ip=x480',
        },
        {
            name: 'Bugs',
            breed: 'Conejo Enano',
            age: '6 meses',
            description: 'Tranquilo y amigable, necesita espacio para saltar.',
            imageUrl: 'https://www.conejos.wiki/Imagenes/foto-de-conejo-hd.jpg',
        },
    ];

    const categories = [
        { emoji: '🐶', title: 'Perros', count: '1,200', link: '/perros' },
        { emoji: '🐱', title: 'Gatos', count: '800', link: '/gatos' },
        { emoji: '🐰', title: 'Conejos', count: '150', link: '/conejos' },
        { emoji: '🐦', title: 'Aves', count: '90', link: '/aves' },
    ];

    const products = [
        {
            name: 'Juguete mordedor para perro',
            description: 'Resistente y seguro, ideal para razas grandes.',
            price: '$25.000',
            imageUrl: 'https://images.unsplash.com/photo-1598133894005-6d5c4b6f634d?auto=format&fit=crop&w=800&q=60',
        },
        {
            name: 'Comida premium para gatos',
            description: 'Alimento balanceado con vitaminas.',
            price: '$32.500',
            imageUrl: 'https://images.unsplash.com/photo-1612929632592-00f1bcdbe3c5?auto=format&fit=crop&w=800&q=60',
        },
        {
            name: 'Servicio de peluquería canina',
            description: 'Baño, corte de pelo y uñas para tu mascota.',
            price: 'Desde $50.000',
            imageUrl: 'https://images.unsplash.com/photo-1575846171058-081d10e4cf21?auto=format&fit=crop&w=800&q=60',
        },
    ];

    return (
        <>
            <Head title="Bienvenido" />
            <Header />
            <main className="relative z-10 w-full bg-white dark:bg-gray-800">
                <HeroSection />
                <PetsSection pets={pets} />
                <CategoriesSection categories={categories} />
                <ProductsSection products={products} />
            </main>
            <Footer />
        </>
    );
}
