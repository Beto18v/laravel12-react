import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BadgeDollarSign, BellRing, BookHeart, ChartSpline, LayoutGrid, MapPinned } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
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

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const filteredNavItems = mainNavItems.filter((item) => {
        if (user.role === 'aliado') {
            // Oculta 'Favoritos' y 'Mapa' para el rol 'aliado'
            return item.href !== '/favoritos' && item.href !== '/mapa';
        }
        // Muestra todos los items para otros roles (cliente, admin)
        return true;
    });

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
                <NavMain items={filteredNavItems} /> {/* Usa los items filtrados */}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
