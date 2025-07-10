<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo Product - Representa productos para venta en la plataforma
 * Relaciones: Pertenece a User, tiene múltiples ProductImage
 */
class Product extends Model
{
    use HasFactory;

    /**
     * Campos asignables en masa
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'user_id',
        'imagen', // Imagen principal (compatibilidad)
    ];

    /**
     * Relación: Producto pertenece a un usuario (aliado)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: Producto tiene múltiples imágenes ordenadas
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }
}
