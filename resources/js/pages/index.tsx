import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

// 1. Importa los componentes de sección que acabamos de crear
import CategoriesSection from '@/components/landing/categories-section';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import PetsSection from '@/components/landing/pets-section';
import ProductsSection from '@/components/landing/products-section';
import { ThemeSwitcher } from '@/components/theme-switcher';

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string;
    user: {
        id: number;
        name: string;
    };
}

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

interface IndexProps {
    productos: Product[];
    mascotas: Mascota[];
}

export default function Welcome({ productos = [], mascotas = [] }: IndexProps) {
    const { props } = usePage<SharedData>();

    // Transformar productos de BD al formato esperado por ProductsSection
    const products = useMemo(() => {
        return productos.map(producto => ({
            name: producto.nombre,
            description: producto.descripcion,
            price: `$${producto.precio.toLocaleString('es-CO')}`,
            imageUrl: producto.imagen ? `/storage/${producto.imagen}` : 'https://images.unsplash.com/photo-1598133894005-6d5c4b6f634d?auto=format&fit=crop&w=800&q=60',
        }));
    }, [productos]);

    // Transformar mascotas de BD al formato esperado por PetsSection
    const pets = useMemo(() => {
        return mascotas.map(mascota => ({
            name: mascota.nombre,
            breed: mascota.raza || mascota.especie,
            age: `${mascota.edad} ${mascota.edad === 1 ? 'año' : 'años'}`,
            description: mascota.descripcion,
            imageUrl: mascota.imagen ? `/storage/${mascota.imagen}` : 'https://images.unsplash.com/photo-1534361960057-19889db9621e?fm=jpg&q=60&w=3000',
        }));
    }, [mascotas]);

    // Datos de categorías (estos pueden seguir siendo estáticos o también hacerse dinámicos)
    const categories = [
        { emoji: '🐶', title: 'Perros', count: '1,200', link: '/mascotas' },
        { emoji: '🐱', title: 'Gatos', count: '800', link: '/mascotas' },
        { emoji: '🐰', title: 'Conejos', count: '150', link: '/mascotas' },
        { emoji: '🐦', title: 'Aves', count: '90', link: '/mascotas' },
    ];

    // Datos de respaldo si no hay productos/mascotas en la BD
    const fallbackProducts = [
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

    const fallbackPets = [
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
            description: 'Tranquila y curiososa, perfecta para apartamentos.',
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

    return (
        <>
            <Head title="Bienvenido" />
            <Header />

            <main className="relative z-10 w-full bg-white dark:bg-gray-800">
                <HeroSection />
                <PetsSection pets={pets.length > 0 ? pets : fallbackPets} />
                <CategoriesSection categories={categories} />
                <ProductsSection products={products.length > 0 ? products : fallbackProducts} />
            </main>

            <Footer />
            <ThemeSwitcher />
        </>
    );
}