import ComunityHero from '@/components/comunidad/comunity-hero';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Head } from '@inertiajs/react';

export default function Comunidad() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gray-800">
            <Head title="Productos" />
            <Header />
            <ComunityHero />
            {/* 2. El <main> ahora empieza directamente con el Hero */}
            <main className="flex-1">
                {/* 3. El resto del contenido va debajo del Hero */}
                <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <aside className="lg:col-span-1"></aside>
                        <section className="lg:col-span-3"></section>
                    </div>
                </div>
            </main>
            <Footer />
            <ThemeSwitcher />
        </div>
    );
}
