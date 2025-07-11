<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/register', [
            'role' => $request->query('role', 'cliente'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function store(Request $request): RedirectResponse
    {
        // 1. Validamos los datos
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'string', 'in:cliente,aliado'],
        ]);

        // 2. Buscamos al usuario (incluyendo inactivos)
        $user = User::withTrashed()->where('email', $request->email)->first();

        // 3. Si el usuario existe...
        if ($user) {
            // ... y está inactivo
            if ($user->trashed()) {
                // Lo restauramos y actualizamos
                $user->restore();
                $user->forceFill([
                    'name' => $request->name,
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                ])->save();
            } else {
                // ... y está activo, lanzamos el error
                throw ValidationException::withMessages([
                    'email' => 'Correo ya registrado.',
                ]);
            }
        } else {
            // 4. Si no existe, lo creamos
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);
        }

        // 5. Iniciamos sesión y redirigimos
        event(new Registered($user));
        Auth::login($user);

        // Redirección por adopción directa
        if ($request->filled('adoptar_mascota')) {
            $id = $request->input('adoptar_mascota');
            $url = route('productos.mascotas') . '?adoptar_mascota=' . $id;
            if ($request->header('X-Inertia')) {
                // Forzar redirección completa del navegador
                return redirect($url)->header('X-Inertia-Location', $url);
            }
            return redirect($url);
        }
        // Redirección inteligente: si hay intended, redirige ahí
        if (session()->has('url.intended')) {
            $intended = session('url.intended');
            session()->forget('url.intended');
            return redirect($intended);
        }
        return redirect(route('dashboard', absolute: false));
    }
}
