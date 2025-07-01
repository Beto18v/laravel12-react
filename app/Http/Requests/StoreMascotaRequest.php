<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMascotaRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Solo usuarios autenticados pueden registrar mascotas
        return auth()->check() && auth()->user()->role === 'aliado';
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'raza' => 'nullable|string|max:255',
            'edad' => 'nullable|integer|min:0',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
