import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Logo from '../../../../public/Logo/Logo.png';

export default function RegistroOpciones() {
  const [tarjetaActiva, setTarjetaActiva] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Opciones de Registro | AdoptaFácil';
  }, []);

  const opcionesRegistro = [
    {
      id: 1,
      titulo: 'Cuidador',
      descripcion:
        'Adopta, publica mascotas o apoya con recursos. Forma parte activa del bienestar animal.',
      icono: '🐾',
      color: 'from-blue-500 to-blue-700',
      rol: 'cliente',
    },
    {
      id: 2,
      titulo: 'Aliado',
      descripcion:
        'Regístrate como refugio, veterinaria o tienda. Conecta tu servicio con quienes más lo necesitan.',
      icono: '🏢',
      color: 'from-green-500 to-green-700',
      rol: 'aliado',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <Head title="Opciones de Registro" />

      {/* Header con logo */}
      <div className="text-center pt-10">
        <Link href={route('dashboard')}>
          <img
            src={Logo}
            alt="Logo AdoptaFácil"
            className="h-20 w-auto mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-4">Únete a AdoptaFácil</h1>
        <p className="text-white/90 mt-2 max-w-xl mx-auto px-4">
          Selecciona el tipo de cuenta que deseas crear y comienza tu experiencia con nosotros
        </p>
      </div>

      {/* Tarjetas de opciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12 px-4">
        {opcionesRegistro.map((opcion) => (
          <div
            key={opcion.id}
            onMouseEnter={() => setTarjetaActiva(opcion.id)}
            onMouseLeave={() => setTarjetaActiva(null)}
            className={`bg-white text-gray-800 rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:shadow-2xl ${
              tarjetaActiva === opcion.id ? 'scale-105 ring-2 ring-white' : ''
            }`}
          >
            <div
              className={`bg-gradient-to-r ${opcion.color} w-16 h-16 flex items-center justify-center rounded-full mx-auto text-3xl mb-4 text-white shadow-md`}
            >
              {opcion.icono}
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">{opcion.titulo}</h3>
            <p className="text-center text-gray-700 mb-6">{opcion.descripcion}</p>
            <Link
              href={route('register', { role: opcion.rol })}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl transition-colors duration-300"
            >
              Registrarme
            </Link>
          </div>
        ))}
      </div>

      {/* Informativo */}
      <section className="bg-white text-gray-800 mt-16 py-10 px-6 md:px-20 rounded-t-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">¿Por qué registrarte en AdoptaFácil?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Proceso simplificado</h3>
            <p>
              Desde la búsqueda hasta el seguimiento, todo está pensado para facilitar la adopción.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Comunidad comprometida</h3>
            <p>
              Únete a quienes realmente aman y protegen a los animales.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Recursos exclusivos</h3>
            <p>
              Accede a beneficios según tu tipo de cuenta.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-center">Preguntas frecuentes</h2>

          <div className="border-b border-gray-300 pb-4">
            <h3 className="font-semibold text-lg">¿Es gratuito el registro?</h3>
            <p className="mt-2">
              Sí, el registro es completamente gratuito para todas las opciones de cuenta.
            </p>
          </div>

          <div className="border-b border-gray-300 pb-4">
            <h3 className="font-semibold text-lg">¿Puedo cambiar mi tipo de cuenta después?</h3>
            <p className="mt-2">
              Claro. Solo necesitas contactar con nuestro equipo de soporte.
            </p>
          </div>

          <div className="border-b border-gray-300 pb-4">
            <h3 className="font-semibold text-lg">¿Qué documentos necesito?</h3>
            <p className="mt-2">
              Depende del tipo de cuenta. Fundaciones y negocios deben adjuntar soporte legal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
