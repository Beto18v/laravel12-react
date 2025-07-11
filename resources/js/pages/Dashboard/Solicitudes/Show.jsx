import React from 'react';
import { Link } from '@inertiajs/react';

export default function Show({ solicitud }) {
  if (!solicitud) return <div>No se encontró la solicitud.</div>;

  const { user, mascota } = solicitud;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Detalle de Solicitud de Adopción</h2>
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Datos del Solicitante</h3>
        <div className="mb-1"><strong>Nombre completo:</strong> {solicitud.nombre_completo}</div>
        <div className="mb-1"><strong>Cédula:</strong> {solicitud.cedula}</div>
        <div className="mb-1"><strong>Email:</strong> {user?.email}</div>
        <div className="mb-1"><strong>Teléfono:</strong> {user?.telefono || 'No registrado'}</div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Mascota Solicitada</h3>
        <div className="mb-1"><strong>Nombre:</strong> {mascota?.nombre}</div>
        <div className="mb-1"><strong>Especie:</strong> {mascota?.especie}</div>
        <div className="mb-1"><strong>Raza:</strong> {mascota?.raza}</div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Respuestas del Formulario</h3>
        <div className="mb-1"><strong>¿Acepta proceso de evaluación?</strong> {solicitud.acepta_proceso_evaluacion ? 'Sí' : 'No'}</div>
        <div className="mb-1"><strong>¿Acepta cuidado responsable?</strong> {solicitud.acepta_cuidado_responsable ? 'Sí' : 'No'}</div>
        <div className="mb-1"><strong>¿Acepta contrato de adopción?</strong> {solicitud.acepta_contrato_adopcion ? 'Sí' : 'No'}</div>
        {/* Agrega aquí más campos según tu formulario */}
      </div>
      <div className="mb-6">
        <div className="mb-1"><strong>Estado de la solicitud:</strong> {solicitud.estado}</div>
        <div className="mb-1"><strong>Fecha de solicitud:</strong> {new Date(solicitud.created_at).toLocaleDateString()}</div>
      </div>
      <div className="flex gap-4">
        <Link href={route('solicitudes.index')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Volver</Link>
      </div>
    </div>
  );
}
