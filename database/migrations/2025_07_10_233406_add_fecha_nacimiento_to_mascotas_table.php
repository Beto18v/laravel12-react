<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Agregar fecha de nacimiento para calcular edad automáticamente
     */
    public function up(): void
    {
        Schema::table('mascotas', function (Blueprint $table) {
            $table->date('fecha_nacimiento')->nullable()->after('edad');
            $table->boolean('edad_estimada')->default(true)->after('fecha_nacimiento');
        });
    }

    /**
     * Eliminar campos agregados
     */
    public function down(): void
    {
        Schema::table('mascotas', function (Blueprint $table) {
            $table->dropColumn(['fecha_nacimiento', 'edad_estimada']);
        });
    }
};
