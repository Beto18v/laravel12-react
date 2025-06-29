// resources/js/pages/auth/registro-opciones.tsx
import { Head, Link } from '@inertiajs/react';
import Logo from '../../../../public/Logo/Logo.png';

export default function RegistroOpciones() {
    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
            <div className="container w-full max-w-md rounded-lg border border-white/20 bg-white/10 p-5 text-center shadow-lg backdrop-blur-md">
                <img src={Logo} alt="Logo" className="mx-auto mb-8 h-36 w-56" />
                <Head title="Opciones de Registro" />
                <h2 className="mb-6 text-2xl font-bold text-white">¿Cómo quieres registrarte?</h2>
                <div className="flex flex-col gap-4">
                    <Link
                        href={route('register', { role: 'cliente' })}
                        className="w-full transform rounded-lg bg-blue-500 px-4 py-3 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600"
                    >
                        Soy un Cliente
                    </Link>
                    <Link
                        href={route('register', { role: 'aliado' })}
                        className="w-full transform rounded-lg bg-green-500 px-4 py-3 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-600"
                    >
                        Soy un Aliado
                    </Link>
                </div>
            </div>
        </div>
    );
}
