<?php
// database/migrations/2025_07_01_000001_create_solicitudes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitudes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('mascota_id')->constrained()->onDelete('cascade');

            // Información Personal
            $table->string('nombre_completo');
            $table->string('cedula');
            $table->string('email');
            $table->string('telefono');
            $table->string('direccion_ciudad');
            $table->string('direccion_barrio');
            $table->string('direccion_postal')->nullable();

            // Vivienda
            $table->string('tipo_vivienda');
            $table->string('propiedad_vivienda');
            $table->string('tiene_patio');
            $table->string('permiten_mascotas_alquiler')->nullable();

            // Convivientes
            $table->integer('cantidad_convivientes');
            $table->string('hay_ninos');
            $table->string('edades_ninos')->nullable();
            $table->string('todos_acuerdo_adopcion');

            // Otras Mascotas (Campos de texto largos eliminados)
            $table->string('tiene_otras_mascotas')->nullable();
            $table->string('tuvo_mascotas_antes')->nullable();

            // Detalles de Adopción
            $table->text('porque_adopta');
            $table->text('que_espera_convivencia');
            $table->text('que_haria_problemas_comportamiento');
            $table->string('acepta_visitas_seguimiento');

            // ✨ CAMPOS AÑADIDOS ✨
            // Punto 6. Compromisos y Condiciones
            $table->boolean('acepta_proceso_evaluacion')->default(false);
            $table->boolean('acepta_cuidado_responsable')->default(false);
            $table->boolean('acepta_contrato_adopcion')->default(false);

            // Estado
            $table->enum('estado', ['Enviada', 'En Proceso', 'Aprobada', 'Rechazada', 'Cancelada'])->default('Enviada');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitudes');
    }
};
