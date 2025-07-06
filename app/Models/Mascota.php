<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mascota extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'especie',
        'raza',
        'edad',
        'descripcion',
        'imagen',
        'user_id',
    ];

    /**
     * Get the user that owns the mascota.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
