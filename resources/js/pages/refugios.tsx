import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Head } from '@inertiajs/react';

export default function Refugios() {
    return (
        <>
            <Head title="Refugios" />
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="mb-8 text-center text-4xl font-bold">Nuestros Refugios Aliados</h1>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-300">
                        Aquí encontrarás una lista de los refugios con los que trabajamos.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
