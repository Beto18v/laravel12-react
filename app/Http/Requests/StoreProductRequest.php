<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio'      => 'required|numeric|min:0',
            'cantidad'    => 'required|integer|min:0',
            'imagen'      => 'required|image|max:2048',
            'shelter_id' => 'required|exists:shelters,id',
        ];
    }
}
