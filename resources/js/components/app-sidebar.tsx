import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BadgeDollarSign, BellRing, BookHeart, ChartSpline, LayoutGrid, MapPinned, PackagePlus, PawPrint } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // Elementos base del menú
    const baseNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Favoritos',
            href: '/favoritos',
            icon: BookHeart,
        },
        {
            title: 'Solicitudes',
            href: '/solicitudes',
            icon: BellRing,
        },
        {
            title: 'Estadísticas',
            href: '/estadisticas',
            icon: ChartSpline,
        },
        {
            title: 'Mapa',
            href: '/mapa',
            icon: MapPinned,
        },
        {
            title: 'Donaciones',
            href: '/donaciones',
            icon: BadgeDollarSign,
        },
        {
            title: 'Notificaciones',
            href: '/notificaciones',
            icon: BellRing,
        },
    ];

    // Modificación condicional según el rol
    let finalNavItems: NavItem[] = [];

    if (user.role === 'cliente') {
        finalNavItems = [
            ...baseNavItems,
            {
                title: 'Productos y Mascotas',
                href: route('productos.mascotas'),
                icon: LayoutGrid,
            },
        ];
    } else if (user.role === 'aliado') {
        // Oculta favoritos y mapa para aliados
        const filteredBase = baseNavItems.filter((item) => item.href !== '/favoritos' && item.href !== '/mapa');

        finalNavItems = [
            ...filteredBase,
            {
                title: 'Registrar Productos',
                href: route('productos.registrar'),
                icon: PackagePlus,
            },
            {
                title: 'Registrar Mascotas',
                href: route('mascotas.registrar'), // Usando el helper de Ziggy
                icon: PawPrint,
            },
        ];
    } else {
        // Otros roles (ej. admin) usan todo el menú y mantienen Productos
        finalNavItems = [
            ...baseNavItems,
            {
                title: 'Productos',
                href: '/productos',
                icon: LayoutGrid,
            },
        ];
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={finalNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
