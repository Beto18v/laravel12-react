import React from 'react';
import { usePage } from '@inertiajs/react';

interface Producto {
    id: number;
    nombre: string;
    descripcion?: string;
    precio?: number;
    user?: { name: string };
}

export default function ProductosMascotas() {
    const productos = (usePage().props.products ?? []) as Producto[];

    return (
        <div>
            <h1>Productos disponibles</h1>
            <ul>
                {productos && productos.length > 0 ? (
                    productos.map((producto) => (
                        <li key={producto.id}>
                            <strong>{producto.nombre}</strong><br />
                            {producto.descripcion && <span>Descripción: {producto.descripcion}</span>}<br />
                            {producto.precio !== undefined && <span>Precio: ${producto.precio}</span>}<br />
                            Registrado por: {producto.user?.name || 'Aliado'}
                        </li>
                    ))
                ) : (
                    <li>No hay productos registrados.</li>
                )}
            </ul>
        </div>
    );
}
