// resources/js/components/comunidad/create-post.tsx
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { CheckCircle, ImagePlus, LogIn, Send, Video, XCircle } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

interface CreatePostProps {
    user?: User;
    onPostCreated?: () => void;
}

export default function CreatePost({ user, onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError('Debes iniciar sesión para publicar');
            return;
        }

        if (!content.trim()) {
            setError('El contenido no puede estar vacío');
            return;
        }

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            if (!csrfToken) {
                setError('Error de seguridad. Por favor, recarga la página.');
                return;
            }

            const formData = new FormData();
            formData.append('content', content);
            formData.append('category', category);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch('/comunidad/posts', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData,
                credentials: 'same-origin',
            });

            const data = await response.json();

            if (response.ok) {
                // Limpiar el formulario
                setContent('');
                setCategory('General');
                setImage(null);
                setSuccess('¡Publicación creada exitosamente!');

                // Llamar al callback para actualizar la lista
                if (onPostCreated) {
                    onPostCreated();
                }

                // Ocultar mensaje de éxito después de 3 segundos
                setTimeout(() => setSuccess(''), 3000);
            } else {
                // Manejar errores de validación
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat().join(', ');
                    setError(errorMessages);
                } else {
                    setError(data.message || 'Error al publicar');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error de conexión. Por favor, intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                // 2MB
                setError('La imagen no puede ser mayor a 2MB');
                return;
            }
            setImage(file);
        }
    };

    if (!user) {
        return (
            <div className="mb-8 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 p-8 shadow-lg dark:from-gray-900 dark:to-gray-950">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                        <LogIn className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">¡Únete a nuestra comunidad!</h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                        Comparte experiencias, consejos y ayuda a otros amantes de los animales. Crea tu cuenta gratuita y forma parte de nuestra
                        familia.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            onClick={() => router.visit('/registro-opciones')}
                            className="bg-teal-500 px-6 py-3 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            Crear Cuenta Gratis
                        </Button>
                        <Button
                            onClick={() => router.visit('/login')}
                            variant="outline"
                            className="border-teal-500 px-6 py-3 text-teal-600 hover:bg-teal-50 dark:border-teal-600 dark:text-teal-400 dark:hover:bg-teal-900/20"
                        >
                            Ya tengo cuenta
                        </Button>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">🐾</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Comparte</div>
                        </div>
                        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">💬</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Comenta</div>
                        </div>
                        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">❤️</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Conecta</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
            <form onSubmit={handleSubmit}>
                <div className="flex items-start">
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                        <Textarea
                            placeholder="¿Qué estás pensando? Comparte una noticia, consejo o campaña..."
                            className="mb-4 min-h-[80px] w-full rounded-lg border-gray-200 bg-gray-100 p-4 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-teal-600 dark:focus:ring-teal-600"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={1000}
                            disabled={isSubmitting}
                        />

                        <div className="mb-4 flex items-center gap-4">
                            <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="General">General</SelectItem>
                                    <SelectItem value="Campaña">Campaña</SelectItem>
                                    <SelectItem value="Noticia">Noticia</SelectItem>
                                    <SelectItem value="Consejo">Consejo</SelectItem>
                                </SelectContent>
                            </Select>

                            {image && <span className="text-sm text-green-600 dark:text-green-400">Imagen seleccionada: {image.name}</span>}
                        </div>

                        {success && (
                            <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/50 dark:text-green-200">
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert className="mb-4 border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/50 dark:text-red-200">
                                <XCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                    disabled={isSubmitting}
                                />
                                <label htmlFor="image-upload">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
                                        disabled={isSubmitting}
                                        asChild
                                    >
                                        <span>
                                            <ImagePlus className="h-6 w-6" />
                                            <span className="sr-only">Añadir imagen</span>
                                        </span>
                                    </Button>
                                </label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                                    disabled={isSubmitting}
                                >
                                    <Video className="h-6 w-6" />
                                    <span className="sr-only">Añadir video</span>
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                className="gap-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                                disabled={isSubmitting || !content.trim()}
                            >
                                <Send className="h-4 w-4" />
                                <span>{isSubmitting ? 'Publicando...' : 'Publicar'}</span>
                            </Button>
                        </div>

                        <div className="mt-2 text-right text-xs text-gray-500">{content.length}/1000 caracteres</div>
                    </div>
                </div>
            </form>
        </div>
    );
}
