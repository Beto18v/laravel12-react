# AdoptaFácil 🐾

![Logo](https://github.com/beto18v/laravel12-react/blob/main/public/Logo/Logo.png?raw=true) ![Logo](https://github.com/beto18v/laravel12-react/blob/main/public/Logo/LogoWhite.png?raw=true)

AdoptaFácil es una plataforma web integral diseñada para facilitar la adopción de mascotas, conectar a la comunidad amante de los animales y ofrecer un espacio para que refugios, veterinarias y tiendas puedan gestionar y ofrecer sus servicios y productos.

## ✨ Características Principales

- **Gestión de Usuarios con Roles:**
    - **Cliente:** Puede adoptar mascotas, comprar productos y realizar donaciones.
    - **Aliado:** (Refugios, veterinarias, etc.) Puede registrar mascotas y productos para la venta.
    - **Administrador:** Tiene control total sobre la plataforma (gestión de usuarios, estadísticas, etc.).
- **Módulo de Adopciones y Productos:**
    - Los aliados pueden registrar mascotas para adopción y productos para la venta.
    - Los clientes pueden ver el catálogo de mascotas y productos, y solicitar adopciones o compras.
- **Sistema de Donaciones:** Los usuarios pueden realizar donaciones a los refugios registrados en la plataforma.
- **Panel de Control (Dashboard):**
    - **Para Clientes:** Visualización de favoritos, estado de solicitudes y donaciones realizadas.
    - **Para Aliados:** Gestión de mascotas y productos, visualización de solicitudes y estadísticas de sus publicaciones.
    - **General:** Estadísticas de adopciones, notificaciones, y un mapa interactivo de adopciones.
- **Proceso de Pago Integrado:** Se utiliza MercadoPago para procesar las compras de productos.
- **Autenticación y Seguridad:**
    - Registro y login de usuarios.
    - Verificación de correo electrónico y recuperación de contraseña.
    - Políticas de acceso para restringir acciones según el rol del usuario.

## 🚀 Tecnologías Utilizadas

- **Backend:** Laravel 12.
- **Frontend:** React con Vite.
- **Framework Full-Stack:** Inertia.js para una integración fluida entre Laravel y React.
- **Estilos:** Tailwind CSS con un sistema de theming (claro, oscuro, azul y verde).
- **Base de Datos:** Configurado para SQLite, MySQL, MariaDB, PostgreSQL y SQL Server.
- **Testing:** Pest para pruebas de backend.
- **Pasarela de Pagos:** MercadoPago.

## 🔧 Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/beto18v/laravel12-react.git](https://github.com/beto18v/laravel12-react.git)
    cd laravel12-react
    ```

2.  **Instalar dependencias de Composer y NPM:**

    ```bash
    composer install
    npm install
    ```

3.  **Configurar el entorno:**

    - Copia el archivo de entorno: `cp .env.example .env`
    - Genera la clave de la aplicación: `php artisan key:generate`
    - Configura tu base de datos y otras variables de entorno en el archivo `.env`.

4.  **Ejecutar las migraciones y seeders:**

    ```bash
    php artisan migrate --seed
    ```

5.  **Crear el enlace simbólico para el almacenamiento:**

    ```bash
    php artisan storage:link
    ```

6.  **Iniciar el entorno de desarrollo:**
    El proyecto incluye un script para levantar todos los servicios necesarios con un solo comando:
    ```bash
    composer run dev
    ```
    Esto iniciará el servidor de desarrollo de PHP, la cola de trabajos y el compilador de Vite.

## 🛠️ Uso

Una vez iniciada la aplicación, puedes acceder a ella en tu navegador (por defecto `http://127.0.0.1:8000`).

- **Registro:** Puedes registrarte como "Cliente" o "Aliado" desde la opción de registro.
- **Crear un administrador:** Puedes crear un usuario administrador a través de la consola con el comando:
    ```bash
    php artisan app:create-admin-user "Nombre" "correo@ejemplo.com" "contraseña"
    ```

## 🧪 Pruebas

Para ejecutar la suite de pruebas automatizadas, utiliza el siguiente comando:

```bash
npm test
```

Esto ejecutará las pruebas de Pest definidas en el proyecto.

## 📄 Licencia

---

## Dependencias:

npm install //Dependencias principales
npm install @inertiajs/inertia //Importacion de Inertia
npm install chart.js react-chartjs-2 //Visualizacion de graficos
npm install jspdf jspdf-autotable //Visualizacion de PDF
composer install //Servidor

copy .env.example .env //Creacion archivo .env
php artisan key:generate //Llave unica para la app
php artisan storage:link //Crea la carpeta donde se almacenan las imagenes
php artisan migrate //Migrar a una DB

composer run dev //Correr aplicacion

php artisan app:create-admin-user "Name" "Email" "Password" //Crear user admin
