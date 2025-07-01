import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Head } from '@inertiajs/react';

export default function Comunidad() {
    return (
        <>
            <Head title="Comunidad" />
            <Header />
            <main className="flex-1 pt-24">
                {' '}
                {/* Añadimos padding-top para que el contenido no quede debajo del header fijo */}
                <div className="container mx-auto px-4 py-12">
                    <h1 className="mb-8 text-center text-4xl font-bold">Nuestra Comunidad</h1>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-300">
                        ¡Bienvenido a nuestro espacio comunitario! Aquí podrás interactuar con otros amantes de las mascotas.
                    </p>
                    {/* Más adelante aquí podrás añadir foros, eventos, etc. */}
                </div>
            </main>
            <Footer />
        </>
    );
}
