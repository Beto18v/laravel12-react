// resources/js/components/comunidad/create-post.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, Send, Video } from 'lucide-react';

export default function CreatePost() {
    return (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
            <div className="flex items-start">
                <Avatar>
                    {/* Aquí se usaría el avatar del usuario autenticado */}
                    <AvatarImage src="https://i.pravatar.cc/150?u=currentuser" alt="Usuario Actual" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                    <Textarea
                        placeholder="¿Qué estás pensando? Comparte una noticia, consejo o campaña..."
                        className="mb-4 min-h-[80px] w-full rounded-lg border-gray-200 bg-gray-100 p-4 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-teal-600 dark:focus:ring-teal-600"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
                            >
                                <ImagePlus className="h-6 w-6" />
                                <span className="sr-only">Añadir imagen</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                            >
                                <Video className="h-6 w-6" />
                                <span className="sr-only">Añadir video</span>
                            </Button>
                        </div>
                        <Button className="gap-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700">
                            <Send className="h-4 w-4" />
                            <span>Publicar</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
