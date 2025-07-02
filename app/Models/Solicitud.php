<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $table = 'solicitudes';

    protected $fillable = [
        'user_id',
        'tipo',
        'item_id',
        'estado',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function producto()
    {
        return $this->belongsTo(\App\Models\Product::class, 'item_id');
    }
    public function mascota()
    {
        return $this->belongsTo(\App\Models\Mascota::class, 'item_id');
    }
}
