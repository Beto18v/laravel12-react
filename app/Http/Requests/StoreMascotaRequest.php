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
            'nombre' => 'required|string',
            'especie' => 'required|string',
            'raza' => 'required|string',
            'edad' => 'required|integer',
            'sexo' => 'required|string',
            'ciudad'      => 'required|string',
            'descripcion' => 'required|string',
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
