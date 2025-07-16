<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\SharedLink;
use App\Models\Post;
use Inertia\Inertia;

class SharedController extends Controller
{
    public function create(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        // Verificar si ya existe un enlace compartido para este post
        $existingLink = SharedLink::where('post_id', $post->id)
            ->where('expires_at', '>', now())
            ->first();

        if ($existingLink) {
            $shareUrl = url("/shared/{$existingLink->token}");
            return response()->json([
                'success' => true,
                'url' => $shareUrl,
                'token' => $existingLink->token
            ]);
        }

        // Generar token único
        $token = Str::random(32);

        // Crear enlace compartido
        $sharedLink = SharedLink::create([
            'post_id' => $post->id,
            'token' => $token,
            'expires_at' => now()->addDays(30), // Expira en 30 días
        ]);

        $shareUrl = url("/shared/{$token}");

        return response()->json([
            'success' => true,
            'url' => $shareUrl,
            'token' => $token
        ]);
    }

    public function show($token)
    {
        $sharedLink = SharedLink::where('token', $token)
            ->where('expires_at', '>', now())
            ->with(['post.author'])
            ->firstOrFail();

        return Inertia::render('Shared/PostShow', [
            'post' => $sharedLink->post,
            'sharedLink' => $sharedLink
        ]);
    }
}
