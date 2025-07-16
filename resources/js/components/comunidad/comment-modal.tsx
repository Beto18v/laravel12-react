import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: {
        name: string;
        avatarUrl: string;
    };
}

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
    is_liked?: boolean;
    comments: number;
    category: string;
}

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post;
    user?: User;
    comments?: Comment[];
    onLikeToggle?: (postId: number, liked: boolean, likesCount: number) => void;
    onCommentUpdate?: (postId: number, commentsCount: number) => void;
}

export default function CommentModal({ isOpen, onClose, post, user, comments = [], onLikeToggle, onCommentUpdate }: CommentModalProps) {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postComments, setPostComments] = useState<Comment[]>(comments);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [currentPost, setCurrentPost] = useState(post);
    const [isLiking, setIsLiking] = useState(false);

    // Cargar comentarios cuando se abre el modal
    useEffect(() => {
        if (isOpen) {
            loadComments();
            setCurrentPost(post);
        }
    }, [isOpen, post.id]);

    // Actualizar el post cuando cambien las props
    useEffect(() => {
        setCurrentPost(post);
    }, [post.likes, post.is_liked]);

    const loadComments = async () => {
        setIsLoadingComments(true);
        try {
            const response = await fetch(`/comunidad/posts/${post.id}/comments`);
            if (response.ok) {
                const data = await response.json();
                setPostComments(data.comments);
            }
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
        } finally {
            setIsLoadingComments(false);
        }
    };

    const handleLike = async () => {
        if (!user || isLiking) return;

        setIsLiking(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            if (!csrfToken) {
                console.error('CSRF token no encontrado');
                return;
            }

            const response = await fetch(`/comunidad/posts/${currentPost.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentPost((prev) => ({
                    ...prev,
                    likes: data.likes_count,
                    is_liked: data.liked,
                }));

                // Notificar al componente padre
                if (onLikeToggle) {
                    onLikeToggle(currentPost.id, data.liked, data.likes_count);
                }
            }
        } catch (error) {
            console.error('Error al dar like:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            if (!csrfToken) {
                console.error('CSRF token no encontrado');
                return;
            }

            const response = await fetch(`/comunidad/posts/${post.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    content: newComment,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setPostComments((prev) => [data.comment, ...prev]);
                setNewComment('');

                // Actualizar contador de comentarios en el post
                const newCommentsCount = postComments.length + 1;
                setCurrentPost((prev) => ({
                    ...prev,
                    comments: newCommentsCount,
                }));

                // Notificar al componente padre sobre el cambio
                if (onCommentUpdate) {
                    onCommentUpdate(post.id, newCommentsCount);
                }
            }
        } catch (error) {
            console.error('Error al comentar:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl border-2 border-teal-300 bg-white p-0 shadow-2xl backdrop-blur-sm dark:border-teal-600 dark:bg-gray-900">
                {/* Header del modal */}
                <div className="rounded-t-lg bg-gradient-to-r from-teal-600 to-blue-700 px-6 py-4 text-white shadow-lg">
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <MessageCircle className="h-6 w-6" />
                        Publicación de {currentPost.author.name}
                    </DialogTitle>
                </div>

                <div className="flex h-full max-h-[calc(90vh-80px)] flex-col bg-white dark:bg-gray-900">
                    {/* Post original con diseño mejorado */}
                    <div className="border-b-2 border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50 px-6 py-4 dark:border-teal-700 dark:from-gray-800 dark:to-gray-700">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 ring-2 ring-teal-300 dark:ring-teal-600">
                                <AvatarImage src={currentPost.author.avatarUrl} alt={currentPost.author.name} />
                                <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200">
                                    {currentPost.author.name.substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-3">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{currentPost.author.name}</h3>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryClass(currentPost.category)}`}>
                                        {currentPost.category}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{currentPost.timestamp}</span>
                                </div>

                                {currentPost.imageUrl ? (
                                    <div className="mb-4 flex gap-4">
                                        <div className="flex-1">
                                            <p className="leading-relaxed text-gray-700 dark:text-gray-300">{currentPost.content}</p>
                                        </div>
                                        <div className="w-1/3 flex-shrink-0">
                                            <img
                                                src={currentPost.imageUrl}
                                                alt="Imagen del post"
                                                className="max-h-32 w-full rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{currentPost.content}</p>
                                )}

                                {/* Acciones del post */}
                                <div className="flex items-center gap-6">
                                    <Button
                                        variant="ghost"
                                        onClick={handleLike}
                                        disabled={!user || isLiking}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
                                            currentPost.is_liked
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400'
                                                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-red-900/50'
                                        }`}
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${currentPost.is_liked ? 'fill-current' : ''} ${isLiking ? 'animate-pulse' : ''}`}
                                        />
                                        <span className="font-medium">{currentPost.likes} Me gusta</span>
                                    </Button>

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-sm font-medium">{postComments.length} comentarios</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario para nuevo comentario */}
                    {user && (
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10 ring-2 ring-teal-300 dark:ring-teal-600">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
                                    <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200">
                                        {user.name.substring(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <form onSubmit={handleSubmitComment} className="flex flex-1 gap-3">
                                    <Textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Comparte tu opinión..."
                                        className="max-h-[120px] min-h-[60px] flex-1 border-2 border-teal-200 bg-white focus:border-teal-400 dark:border-teal-700 dark:bg-gray-700 dark:focus:border-teal-500"
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!newComment.trim() || isSubmitting}
                                        className="h-12 w-12 self-end rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700"
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Lista de comentarios */}
                    <div className="flex-1 overflow-y-auto bg-white px-6 py-4 dark:bg-gray-900">
                        <div className="space-y-4">
                            {isLoadingComments ? (
                                <div className="py-8 text-center">
                                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-teal-500"></div>
                                    <p className="mt-2 text-gray-500">Cargando comentarios...</p>
                                </div>
                            ) : postComments.length === 0 ? (
                                <div className="py-12 text-center">
                                    <MessageCircle className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                                    <p className="text-lg font-medium text-gray-500">
                                        {user ? '¡Sé el primero en comentar!' : 'No hay comentarios aún'}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-400">
                                        {user ? 'Comparte tu opinión sobre esta publicación' : 'Inicia sesión para participar en la conversación'}
                                    </p>
                                </div>
                            ) : (
                                postComments.map((comment, index) => (
                                    <div
                                        key={comment.id}
                                        className={`flex gap-4 rounded-xl p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                                            index === 0 ? 'border border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20' : ''
                                        }`}
                                    >
                                        <Avatar className="h-8 w-8 ring-1 ring-gray-200 dark:ring-gray-600">
                                            <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                                            <AvatarFallback className="bg-gradient-to-br from-teal-100 to-blue-100 text-teal-800 dark:from-teal-800 dark:to-blue-800 dark:text-teal-200">
                                                {comment.user.name.substring(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-700">
                                                <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{comment.user.name}</p>
                                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{comment.content}</p>
                                            </div>
                                            <p className="mt-2 ml-4 text-xs text-gray-500 dark:text-gray-400">{comment.created_at}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Sección para usuarios no registrados */}
                    {!user && (
                        <div className="border-t border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50 px-6 py-6 dark:border-teal-700 dark:from-gray-800 dark:to-gray-700">
                            <div className="text-center">
                                <Heart className="mx-auto mb-3 h-12 w-12 text-teal-500" />
                                <p className="mb-4 font-medium text-gray-700 dark:text-gray-300">¡Únete a la conversación!</p>
                                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    Inicia sesión para comentar y dar like a las publicaciones
                                </p>
                                <Button
                                    onClick={() => (window.location.href = '/registro-opciones')}
                                    className="rounded-full bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-2 font-semibold text-white shadow-lg transition-all hover:from-teal-600 hover:to-blue-700 hover:shadow-xl"
                                >
                                    Crear cuenta gratis
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
