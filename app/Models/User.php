<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // cliente, aliado, admin
    ];

    use HasFactory, Notifiable, SoftDeletes;
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relacion entre User y Shelter
    public function shelter()
    {
        return $this->hasOne(Shelter::class);
    }

    // Relacion entre User y Mascotas
    public function mascotas()
    {
        return $this->hasMany(Mascota::class);
    }

    // Relación entre User y Favoritos
    public function favoritos()
    {
        return $this->hasMany(Favorito::class);
    }

    // Relación many-to-many con mascotas favoritas
    public function mascotasFavoritas()
    {
        return $this->belongsToMany(Mascota::class, 'favoritos', 'user_id', 'mascota_id')
            ->withTimestamps();
    }
}
