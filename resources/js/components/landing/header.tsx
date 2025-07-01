import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Logo from '../../../../public/Logo/Logo.png';
import LogoWhite from '../../../../public/Logo/LogoWhite.png';

export default function Header() {
    const { props } = usePage<SharedData>();
    const auth = props.auth || { user: null };
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="dark:shadow-dark relative z-20 bg-white shadow-md dark:bg-gray-800">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href={route('landing')} className="flex flex-shrink-0 items-center space-x-2">
                    <img src={Logo} alt="Logo Adoptafácil" className="block h-12 w-auto dark:hidden" />
                    <img src={LogoWhite} alt="Logo Adoptafácil" className="hidden h-12 w-auto dark:block" />
                    <h1 className="hidden font-bold text-blue-600 md:block dark:text-blue-400">ADOPTAFÁCIL</h1>
                </Link>

                {/* Menú para Escritorio */}
                <nav className="hidden space-x-6 md:flex">
                    <Link
                        href={route('productos')}
                        className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        PRODUCTOS
                    </Link>
                    <Link href="/mascotas" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                        MASCOTAS
                    </Link>
                    <Link
                        href={route('refugios')}
                        className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        REFUGIOS
                    </Link>
                    <Link href="#contacto" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                        CONTACTO
                    </Link>
                </nav>

                {/* Contenedor para botones de Auth y menú hamburguesa */}
                <div className="flex items-center">
                    {/* Botones de Login/Registro para Escritorio */}
                    <div className="hidden items-center space-x-4 md:flex">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href={route('register.options')}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Botón de Hamburguesa para Móvil */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            <svg className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable (Móvil) */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <Link
                        href={route('productos')}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        PRODUCTOS
                    </Link>
                    <Link
                        href="/mascotas"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        MASCOTAS
                    </Link>
                    <Link
                        href={route('refugios')}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        REFUGIOS
                    </Link>
                    <Link
                        href="#contacto"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        CONTACTO
                    </Link>
                    <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-600">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href={route('register.options')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
