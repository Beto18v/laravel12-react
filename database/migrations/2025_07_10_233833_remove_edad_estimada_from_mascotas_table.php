<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Eliminar campo edad_estimada y modificar edad para almacenar años
     */
    public function up(): void
    {
        Schema::table('mascotas', function (Blueprint $table) {
            $table->dropColumn('edad_estimada');
            // El campo edad ahora almacenará años calculados automáticamente
        });
    }

    /**
     * Restaurar campo edad_estimada
     */
    public function down(): void
    {
        Schema::table('mascotas', function (Blueprint $table) {
            $table->boolean('edad_estimada')->default(true)->after('fecha_nacimiento');
        });
    }
};
