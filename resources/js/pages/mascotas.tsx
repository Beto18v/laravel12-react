import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Head } from '@inertiajs/react';

export default function Mascotas() {
    return (
        <>
            <Head title="Mascotas" />
            <Header />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="mb-8 text-center text-4xl font-bold">Mascotas</h1>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-300">Aquí encontrarás nuestra lista de mascotas registradas.</p>
                </div>
            </main>
            <Footer />
        </>
    );
}
