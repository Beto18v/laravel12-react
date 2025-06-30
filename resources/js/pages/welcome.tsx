import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Logo from '../../../public/Logo/Logo.png';
import LogoWhite from '../../../public/Logo/LogoWhite.png';

export default function Welcome() {
    const { props } = usePage<SharedData>();
    const auth = props.auth || { user: null };

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

            <header className="relative z-10 bg-white shadow-md dark:bg-gray-800 dark:shadow-dark">
                <div className="container mx-auto flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo Adoptafácil" className="block h-12 w-full dark:hidden" />
                        <img src={LogoWhite} alt="Logo Adoptafácil" className="hidden h-12 w-full dark:block" />
                        <h1 className="hidden font-bold text-blue-600 md:block dark:text-blue-400">ADOPTAFÁCIL</h1>
                    </div>
                    <nav className="hidden space-x-6 md:flex">
                        <Link href="/perros" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">PERROS</Link>
                        <Link href="/gatos" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">GATOS</Link>
                        <Link href={route('productos')} className="...">PRODUCTOS</Link>                       
                        <Link href="/registro-opciones" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">REGISTRARSE</Link>
                        <Link href="#" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">CONTACTO</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hidden font-medium text-gray-700 hover:text-blue-600 md:inline-block dark:text-gray-300 dark:hover:text-blue-400">Iniciar sesión</Link>
                                <Link href={route('register.options')} className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Registrarse</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full bg-white dark:bg-gray-800">
                <section className="relative bg-gradient-to-r from-green-400 to-blue-500 py-20 dark:from-green-600 dark:to-blue-700">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-4xl font-bold">Encuentra a tu nuevo mejor amigo</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl">Conectamos a mascotas necesitadas con hogares amorosos desde 2025</p>

                        <form className="mx-auto flex max-w-2xl flex-col space-y-2 rounded-xl bg-white p-2 shadow-xl sm:flex-row sm:space-y-0 dark:bg-gray-800">
                            <input type="text" placeholder="Buscar por raza (Ej: Perro, Gato)" className="w-full rounded-lg px-4 py-3 text-gray-700 focus:outline-none sm:flex-1 sm:rounded-l-lg sm:rounded-r-none dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" />
                            <input type="text" placeholder="Ciudad" className="w-full rounded-lg border-t border-gray-200 px-4 py-3 text-gray-700 focus:outline-none sm:flex-1 sm:rounded-none sm:border-t-0 sm:border-l dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" />
                            <button type="submit" className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 sm:w-auto sm:rounded-l-none sm:rounded-r-lg dark:bg-blue-700 dark:hover:bg-blue-800">Buscar</button>
                        </form>
                    </div>
                </section>

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

                <section className="bg-gray-50 py-16 dark:bg-gray-700">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white">Productos y servicios para tu mascota</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 bg-gray-800 py-10 text-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <h3 className="mb-4 text-xl font-bold">ADOPTAFÁCIL</h3>
                            <p className="text-gray-400">Conectando mascotas con hogares amorosos desde 2023.</p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Enlaces útiles</h4>
                            <ul className="space-y-2">
                                <li><Link href="/como-adoptar" className="text-gray-400 transition hover:text-white">Cómo adoptar</Link></li>
                                <li><Link href="/faq" className="text-gray-400 transition hover:text-white">Preguntas frecuentes</Link></li>
                                <li><Link href="/blog" className="text-gray-400 transition hover:text-white">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Contacto</h4>
                            <ul className="space-y-2">
                                <li className="text-gray-400">info@adoptafacil.com</li>
                                <li className="text-gray-400">+1 234 567 890</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Síguenos</h4>
                            <div className="flex space-x-4">
                                <Link href="#" className="text-gray-400 transition hover:text-white">FB</Link>
                                <Link href="#" className="text-gray-400 transition hover:text-white">IG</Link>
                                <Link href="#" className="text-gray-400 transition hover:text-white">TW</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                        <p>© 2023 Adoptafácil. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

function PetCard({ name, breed, age, description, imageUrl }: { name: string; breed: string; age: string; description: string; imageUrl: string }) {
    return (
        <div className="pet-card dark:shadow-dark overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl dark:bg-gray-700">
            <img src={imageUrl} alt={`${name} - ${breed}`} className="h-48 w-full object-cover" loading="lazy" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">{breed} • {age}</p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
                <Link href="/conocer-mas" className="block w-full rounded-lg bg-blue-600 py-2 text-center text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Conocer más</Link>
            </div>
        </div>
    );
}

function CategoryCard({ emoji, title, count, link }: { emoji: string; title: string; count: string; link: string }) {
    return (
        <Link href={link} className="category-card dark:shadow-dark transform rounded-lg bg-white p-6 text-center shadow-md transition hover:scale-105 dark:bg-gray-700">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-3xl">{emoji}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">+{count} disponibles</p>
        </Link>
    );
}

function ProductCard({ name, description, price, imageUrl }: { name: string; description: string; price: string; imageUrl: string }) {
    return (
        <div className="product-card dark:shadow-dark overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl dark:bg-gray-700">
            <img src={imageUrl} alt={name} className="h-48 w-full object-cover" loading="lazy" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">{description}</p>
                <p className="mb-4 font-bold text-blue-600 dark:text-blue-400">{price}</p>
                <Link href="/productos" className="block w-full rounded-lg bg-green-600 py-2 text-center text-white transition hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Ver más</Link>
            </div>
        </div>
    );
}
