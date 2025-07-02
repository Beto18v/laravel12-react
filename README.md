# laravel12-react

## Descripción general del proyecto

Este proyecto es una plataforma web desarrollada con **Laravel** (backend/API) y **React** (frontend, usando Inertia.js) para la gestión de productos y mascotas, con roles diferenciados para aliados y clientes. Permite el registro, visualización y gestión de mascotas y productos, así como la generación de reportes en PDF y visualización de gráficos.

### Características principales
- Registro y visualización de mascotas y productos.
- Roles diferenciados: "aliado" (puede registrar) y "cliente" (puede visualizar/adoptar/comprar).
- Visualización combinada de productos y mascotas para clientes, con filtros y diseño profesional.
- Subida y visualización de imágenes para mascotas (en progreso).
- Visualización de gráficos con Chart.js.
- Generación de reportes PDF con jsPDF y autotable.
- UI/UX moderna y responsiva con Tailwind CSS.

## Progreso y trabajo realizado hoy

- Se revisó y mejoró el flujo completo de registro y visualización de mascotas y productos.
- Se implementó la subida de imágenes para mascotas y su almacenamiento seguro en el backend.
- Se mejoró el formulario de registro de mascotas para aliados, haciéndolo profesional, validado y amigable.
- Se adaptó la vista de tarjetas de mascotas y la vista combinada para clientes, con diseño profesional y feedback visual.
- Se reforzó la validación para que todos los campos sean obligatorios.
- Se documentó y depuró el flujo de imágenes, identificando que el problema actual es de configuración del servidor web (Apache no sigue enlaces simbólicos por defecto en Windows).

### Pendiente por resolver
- Visualización de imágenes en las cards del cliente: el backend y frontend están correctos, pero falta ajustar la configuración de Apache para que siga enlaces simbólicos (`FollowSymLinks`).
- Acceso directo con cuenta Google (no implementado).
- Mejorar documentación de despliegue en Windows.

## Instalación y ejecución del proyecto

1. **Clona el repositorio y entra a la carpeta del proyecto:**
   ```bash
   git clone <repo-url>
   cd laravel12-react
   ```
2. **Instala las dependencias principales:**
   ```bash
   npm install # Dependencias principales
   npm install chart.js react-chartjs-2 # Visualización de gráficos
   npm install jspdf jspdf-autotable # Visualización de PDF
   composer install # Servidor Laravel
   ```
3. **Configura el entorno:**
   ```bash
   copy .env.example .env # Creación archivo .env
   php artisan key:generate # Llave única para la app
   php artisan migrate # Migrar a una DB
   ```
4. **(Opcional, recomendado para imágenes):**
   ```bash
   php artisan storage:link # Solo si usas almacenamiento en storage/app/public
   ```
5. **Corre la aplicación:**
   ```bash
   composer run dev # Compila y levanta el frontend y backend
   ```

## Notas importantes
- Si tienes problemas para visualizar imágenes subidas por usuarios, revisa la configuración de Apache y asegúrate de que permita `FollowSymLinks` en la carpeta `public`.
- El acceso con Google aún no está implementado.
- Para producción, revisa permisos y configuración de archivos estáticos.

---

**Trabajo realizado el 30/06/2025:**
- Mejoras en UI/UX, validaciones, subida y visualización de imágenes, y documentación.
- Pendiente: visualización de imágenes en cards de cliente (ajuste de Apache) y login con Google.

**Trabajo realizado el 01/07/2025 (MercadoPago):**
- Se integró MercadoPago para el flujo de compra de productos (pendiente de habilitar completamente, aún responde 500 en el backend):
  - Instalación del SDK oficial de MercadoPago en el backend (`composer require mercadopago/dx-php`).
  - Se crearon/editaron los siguientes archivos para la integración:
    - `app/Http/Controllers/PagoController.php`: Controlador que genera la preferencia de pago y calcula la cuota moderadora (15%).
    - Rutas en `routes/web.php`: POST `/pagos/iniciar` y webhook `/pagos/webhook`.
    - Edición de `resources/js/pages/Dashboard/VerMascotasProductos/productos-mascotas.tsx`: El frontend envía la solicitud de compra y redirige al usuario a la URL de pago de MercadoPago, con manejo de errores y validación de sesión/CSRF.
  - Se documentó el flujo: al pagar exitosamente, MercadoPago notifica al backend mediante webhook y se registra la compra.
- El flujo permite simular un marketplace: el usuario paga, se descuenta la comisión, y el backend registra la transacción.
- **Pendiente:** Finalizar la configuración del backend para que MercadoPago funcione sin error 500 y habilitar el flujo real de pagos y notificaciones avanzadas si se requiere.

**Centralización y validación en métodos store (01/07/2025):**
- Se implementó un flujo robusto y centralizado para el registro de productos y mascotas:
  - Se creó/ajustó el controlador `app/Http/Controllers/ProductosMascotasController.php` para manejar el registro unificado de productos y mascotas, incluyendo validación, subida de imágenes y asociación a usuario.
  - Se implementaron métodos `store` en controladores como `ShelterController.php` y otros, siguiendo la convención de Laravel para creación de recursos.
  - Se utilizaron validaciones centralizadas, tanto directamente en el método `store` (`$request->validate([...])`), como con la posibilidad de requests personalizados (`app/Http/Requests/StoreProductRequest.php`, `StoreMascotaRequest.php`, etc.) para mayor escalabilidad.
  - Se ajustaron las rutas en `routes/web.php` para apuntar a los métodos centralizados y unificados.
- Este enfoque permite mantener la lógica de validación y almacenamiento en un solo lugar, facilitando el mantenimiento y la extensión del sistema.

_Autor: AGamez10_
