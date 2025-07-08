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
                                                    <TableCell className="text-right">
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
            </main>
        </AppLayout>
    );
}
