# Carrusel Modal - Documentación

## Características

El carrusel modal es un componente moderno y avanzado que permite:

### 🎨 Funcionalidades Visuales

- **Transiciones suaves** con animaciones usando Framer Motion
- **Diseño responsivo** que se adapta a diferentes tamaños de pantalla
- **Tema oscuro/claro** compatible con el sistema de temas del proyecto
- **Loading states** con indicadores de carga atractivos
- **Hover effects** con escalado y transiciones

### 🎯 Navegación

- **Navegación por teclado**: Flechas izquierda/derecha, Escape para cerrar, Espacio para play/pausa
- **Navegación por mouse**: Botones de anterior/siguiente, dots indicadores
- **Auto-play opcional** con controles de pausa/reproducción
- **Indicadores de progreso** que muestran la posición actual

### 📱 Interactividad

- **Click en imágenes** de las tarjetas para abrir el carrusel
- **Navegación entre elementos** sin cerrar el modal
- **Pausa automática** cuando el usuario interactúa
- **Controles intuitivos** para una experiencia de usuario fluida

### 🛍️ Contenido Dinámico

- **Soporte para productos y mascotas** con interfaces diferentes
- **Información detallada** con descripción, precios, datos del refugio
- **Botones de acción específicos** (Adoptar, Comprar, Contactar)
- **Sistema de favoritos** integrado

### ⚡ Rendimiento

- **Lazy loading** de imágenes
- **Optimización de re-renders** con hooks personalizados
- **Gestión eficiente del estado** con el hook useCarousel

## Uso

### En Productos

```tsx
// En la página de productos
const handleProductClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
};

// En el render de ProductCard
<ProductCard
    key={product.id}
    {...product}
    onImageClick={() => handleProductClick(index)}
/>

// Modal
<CarouselModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    items={filteredProducts} // Array con type: 'product'
    initialIndex={selectedIndex}
/>
```

### En Mascotas

```tsx
// Similar implementación para mascotas
const handlePetClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
};

// En el render de PetCard
<PetCard
    key={pet.id}
    {...pet}
    onImageClick={() => handlePetClick(index)}
/>

// Modal
<CarouselModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    items={filteredPets} // Array con type: 'pet'
    initialIndex={selectedIndex}
/>
```

## Controles

- **Flechas del teclado**: Navegar entre elementos
- **Escape**: Cerrar modal
- **Espacio**: Activar/desactivar auto-play
- **Click en dots**: Ir directamente a un elemento específico
- **Hover en imagen**: Pausar auto-play temporalmente

## Estructura de Datos

### Para Productos

```typescript
interface Product {
    type: 'product';
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imageUrl: string;
    shelter: string;
    category?: string;
    seller?: string;
}
```

### Para Mascotas

```typescript
interface Pet {
    type: 'pet';
    id: number;
    name: string;
    especie: string;
    raza?: string;
    edad: number;
    sexo?: string;
    ciudad?: string;
    descripcion: string;
    imageUrl: string;
    shelter: string;
}
```

## Instalación

El carrusel requiere las siguientes dependencias:

- `framer-motion` (ya instalado)
- Componentes UI existentes: `Button`, `Badge`
- Iconos de `lucide-react`

## Archivos Creados/Modificados

1. **`/components/ui/carousel-modal.tsx`** - Componente principal del carrusel
2. **`/hooks/use-carousel.tsx`** - Hook personalizado para la lógica del carrusel
3. **`/components/productos/product-card.tsx`** - Modificado para agregar onClick
4. **`/components/mascotas/pet-card.tsx`** - Modificado para agregar onClick
5. **`/pages/productos.tsx`** - Integración del carrusel modal
6. **`/pages/mascotas.tsx`** - Integración del carrusel modal

¡El carrusel está listo para usar! 🎉
