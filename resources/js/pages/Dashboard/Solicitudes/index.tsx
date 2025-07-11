import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

// Tipos de datos que el controlador envía
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
interface Mascota {
    id: number;
    nombre: string;
    imagen?: string;
    user_id: number;
}
interface Solicitud {
    id: number;
    estado: string;
    created_at: string;
    mascota: Mascota;
}
interface SolicitudesPageProps {
    solicitudes: Solicitud[];
    auth: { user: User };
}

export default function SolicitudesIndex({ auth, solicitudes }: SolicitudesPageProps) {
    const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);

    const handleCancel = (solicitudId: number) => {
        if (confirm('¿Estás seguro de que quieres cancelar esta solicitud?')) {
            router.delete(route('solicitudes.destroy', solicitudId), { preserveScroll: true });
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'Aprobada':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'En Proceso':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Rechazada':
            case 'Cancelada':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-300';
        }
    };

    const breadcrumbs = [{ title: 'Solicitudes', href: route('solicitudes.index') }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis Solicitudes" />
            <main className="flex-1 overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 p-6 dark:from-green-600 dark:to-blue-700">
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                {solicitudes.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Mascota</TableHead>
                                                <TableHead>Estado</TableHead>
                                                <TableHead>Fecha de Solicitud</TableHead>
                                                <TableHead className="text-right">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {solicitudes.map((solicitud) => (
                                                <TableRow key={solicitud.id}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={
                                                                    solicitud.mascota.imagen
                                                                        ? `/storage/${solicitud.mascota.imagen}`
                                                                        : 'https://via.placeholder.com/150'
                                                                }
                                                                alt={solicitud.mascota.nombre}
                                                                className="h-10 w-10 rounded-full object-cover"
                                                            />
                                                            <span>{solicitud.mascota.nombre}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={getStatusBadgeClass(solicitud.estado)}>
                                                            {solicitud.estado}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{new Date(solicitud.created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right flex gap-2 justify-end">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setSelectedSolicitud(solicitud)}
                                                        >
                                                            Ver Detalle
                                                        </Button>
                                                        {solicitud.estado === 'Enviada' && (
                                                            <Button variant="destructive" size="icon" onClick={() => handleCancel(solicitud.id)}>
                                                                <Trash2 className="h-4 w-4" />
                                                                <span className="sr-only">Cancelar Solicitud</span>
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>Aún no has realizado ninguna solicitud de adopción.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal/Card para mostrar el detalle de la solicitud */}
                {selectedSolicitud && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200 dark:border-gray-700 animate-fade-in">
                            <button
                                className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500 transition-colors bg-white dark:bg-gray-900 rounded-full shadow p-1 z-10"
                                onClick={() => setSelectedSolicitud(null)}
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Detalle de Solicitud de Adopción</h2>
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Datos del Solicitante</h3>
                                        <div className="mb-1"><strong>Nombre completo:</strong> {selectedSolicitud.nombre_completo}</div>
                                        <div className="mb-1"><strong>Cédula:</strong> {selectedSolicitud.cedula}</div>
                                        <div className="mb-1"><strong>Email:</strong> {selectedSolicitud.email}</div>
                                        <div className="mb-1"><strong>Teléfono:</strong> {selectedSolicitud.telefono}</div>
                                        <div className="mb-1"><strong>Ciudad:</strong> {selectedSolicitud.direccion_ciudad}</div>
                                        <div className="mb-1"><strong>Barrio:</strong> {selectedSolicitud.direccion_barrio}</div>
                                        <div className="mb-1"><strong>Código Postal:</strong> {selectedSolicitud.direccion_postal}</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Vivienda</h3>
                                        <div className="mb-1"><strong>Tipo de vivienda:</strong> {selectedSolicitud.tipo_vivienda}</div>
                                        <div className="mb-1"><strong>Propiedad de la vivienda:</strong> {selectedSolicitud.propiedad_vivienda}</div>
                                        <div className="mb-1"><strong>Tiene patio:</strong> {selectedSolicitud.tiene_patio}</div>
                                        <div className="mb-1"><strong>¿Permiten mascotas en alquiler?:</strong> {selectedSolicitud.permiten_mascotas_alquiler}</div>
                                    </div>
                                </div>
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Convivientes</h3>
                                        <div className="mb-1"><strong>Cantidad de convivientes:</strong> {selectedSolicitud.cantidad_convivientes}</div>
                                        <div className="mb-1"><strong>¿Hay niños?:</strong> {selectedSolicitud.hay_ninos}</div>
                                        <div className="mb-1"><strong>Edades de los niños:</strong> {selectedSolicitud.edades_ninos}</div>
                                        <div className="mb-1"><strong>¿Todos están de acuerdo con la adopción?:</strong> {selectedSolicitud.todos_acuerdo_adopcion}</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Otras Mascotas</h3>
                                        <div className="mb-1"><strong>¿Tiene otras mascotas?:</strong> {selectedSolicitud.tiene_otras_mascotas}</div>
                                        <div className="mb-1"><strong>¿Tuvo mascotas antes?:</strong> {selectedSolicitud.tuvo_mascotas_antes}</div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Detalles de Adopción</h3>
                                    <div className="mb-1"><strong>¿Por qué desea adoptar?:</strong> {selectedSolicitud.porque_adopta}</div>
                                    <div className="mb-1"><strong>¿Qué espera de la convivencia?:</strong> {selectedSolicitud.que_espera_convivencia}</div>
                                    <div className="mb-1"><strong>¿Qué haría ante problemas de comportamiento?:</strong> {selectedSolicitud.que_haria_problemas_comportamiento}</div>
                                    <div className="mb-1"><strong>¿Acepta visitas de seguimiento?:</strong> {selectedSolicitud.acepta_visitas_seguimiento}</div>
                                </div>
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Compromisos y Condiciones</h3>
                                        <div className="mb-1"><strong>¿Acepta proceso de evaluación?:</strong> {selectedSolicitud.acepta_proceso_evaluacion ? 'Sí' : 'No'}</div>
                                        <div className="mb-1"><strong>¿Acepta cuidado responsable?:</strong> {selectedSolicitud.acepta_cuidado_responsable ? 'Sí' : 'No'}</div>
                                        <div className="mb-1"><strong>¿Acepta contrato de adopción?:</strong> {selectedSolicitud.acepta_contrato_adopcion ? 'Sí' : 'No'}</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">Mascota Solicitada</h3>
                                        <div className="mb-1"><strong>Nombre:</strong> {selectedSolicitud.mascota?.nombre}</div>
                                        <div className="mb-1"><strong>Especie:</strong> {selectedSolicitud.mascota?.especie}</div>
                                        <div className="mb-1"><strong>Raza:</strong> {selectedSolicitud.mascota?.raza}</div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="mb-1"><strong>Estado de la solicitud:</strong> {selectedSolicitud.estado}</div>
                                    <div className="mb-1"><strong>Fecha de solicitud:</strong> {new Date(selectedSolicitud.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className="flex flex-wrap gap-4 justify-center mt-4">
                                    {auth.user.role === 'aliado' && selectedSolicitud.mascota?.user_id === auth.user.id && (
                                        <>
                                            <Button
                                                variant="success"
                                                onClick={async () => {
                                                    if (!selectedSolicitud) return;
                                                    await fetch(route('solicitudes.updateEstado', selectedSolicitud.id), {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'X-Requested-With': 'XMLHttpRequest',
                                                            'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || ''
                                                        },
                                                        body: JSON.stringify({ estado: 'Aprobada' })
                                                    });
                                                    setSelectedSolicitud({ ...selectedSolicitud, estado: 'Aprobada' });
                                                    window.location.reload();
                                                }}
                                                disabled={selectedSolicitud.estado === 'Aprobada'}
                                            >
                                                Aprobar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={async () => {
                                                    if (!selectedSolicitud) return;
                                                    await fetch(route('solicitudes.updateEstado', selectedSolicitud.id), {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'X-Requested-With': 'XMLHttpRequest',
                                                            'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || ''
                                                        },
                                                        body: JSON.stringify({ estado: 'Rechazada' })
                                                    });
                                                    setSelectedSolicitud({ ...selectedSolicitud, estado: 'Rechazada' });
                                                    window.location.reload();
                                                }}
                                                disabled={selectedSolicitud.estado === 'Rechazada'}
                                            >
                                                Rechazar
                                            </Button>
                                        </>
                                    )}
                                    <Button variant="outline" onClick={() => setSelectedSolicitud(null)}>Cerrar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </AppLayout>
    );
}
