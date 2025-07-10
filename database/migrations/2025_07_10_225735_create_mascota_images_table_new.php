<?php

u    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mascota_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mascota_id');
            $table->string('image_path');
            $table->integer('order')->default(1); // Para ordenar las imágenes
            $table->timestamps();

            $table->foreign('mascota_id')->references('id')->on('mascotas')->onDelete('cascade');
            $table->index(['mascota_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mascota_images');
    }base\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mascota_images_table_new', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mascota_images_table_new');
    }
};
