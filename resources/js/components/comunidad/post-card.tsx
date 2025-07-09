// resources/js/components/comunidad/post-card.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface Post {
    id: number;
    author: {
        name: string;
        avatarUrl: string;
    };
    timestamp: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
    category: string;
}

export default function PostCard({ post }: { post: Post }) {
    const getCategoryClass = (category: string) => {
        switch (category) {
            case 'Campaña':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Noticia':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Consejo':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-900">
            {/* Cabecera de la publicación */}
            <div className="flex items-center p-4">
                <Avatar>
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <p className="font-bold text-gray-900 dark:text-white">{post.author.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                </div>
                <span className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${getCategoryClass(post.category)}`}>{post.category}</span>
            </div>

            {/* Contenido */}
            <div className="px-4 pb-4">
                <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
            </div>

            {/* Acciones (Me gusta, Comentar, Compartir) */}
            <div className="flex justify-around border-t border-gray-200 p-2 dark:border-gray-700">
                <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-gray-600 hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/50 dark:hover:text-red-500"
                >
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">{post.likes} Me gusta</span>
                </Button>
                <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-500"
                >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{post.comments} Comentarios</span>
                </Button>
                <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-gray-600 hover:bg-green-100 hover:text-green-600 dark:text-gray-400 dark:hover:bg-green-900/50 dark:hover:text-green-500"
                >
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm">Compartir</span>
                </Button>
            </div>
        </div>
    );
}
