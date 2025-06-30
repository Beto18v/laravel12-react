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