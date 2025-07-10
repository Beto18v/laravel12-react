<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MascotaImage extends Model
{
    protected $fillable = [
        'mascota_id',
        'imagen_path',
        'orden',
    ];

    /**
     * Get the mascota that owns the image.
     */
    public function mascota(): BelongsTo
    {
        return $this->belongsTo(Mascota::class);
    }
}
