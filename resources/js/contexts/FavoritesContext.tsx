import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface FavoritesContextType {
    favoriteIds: number[];
    isLoading: boolean;
    isInitialized: boolean;
    isFavorite: (mascotaId: number) => boolean;
    toggleFavorite: (mascotaId: number) => Promise<void>;
    addToFavorites: (mascotaId: number) => Promise<void>;
    removeFromFavorites: (mascotaId: number) => Promise<void>;
    refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Set para búsquedas más rápidas
    const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

    const refreshFavorites = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/favoritos/ids', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setFavoriteIds(data.favorite_ids || []);
                    console.log('Favoritos cargados:', data.favorite_ids || []);
                } else {
                    console.error('Respuesta no es JSON:', await response.text());
                    setFavoriteIds([]);
                }
            } else if (response.status === 401) {
                // Usuario no autenticado
                setFavoriteIds([]);
                console.log('Usuario no autenticado, favoritos vacíos');
            } else {
                console.error('Error en respuesta:', response.status, response.statusText);
                setFavoriteIds([]);
            }
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
            setFavoriteIds([]);
        } finally {
            setIsLoading(false);
            setIsInitialized(true);
        }
    }, []);

    // Cargar favoritos al inicializar el contexto
    useEffect(() => {
        refreshFavorites();
    }, [refreshFavorites]);

    const isFavorite = useCallback(
        (mascotaId: number): boolean => {
            const result = favoriteSet.has(mascotaId);
            console.log(`¿Es favorito ${mascotaId}?`, result, 'Lista:', favoriteIds);
            return result;
        },
        [favoriteSet, favoriteIds],
    );

    const addToFavorites = useCallback(
        async (mascotaId: number) => {
            // Evitar duplicados y llamadas innecesarias
            if (favoriteSet.has(mascotaId) || isLoading) return;

            setIsLoading(true);
            try {
                const response = await fetch('/favoritos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({ mascota_id: mascotaId }),
                });

                const data = await response.json();

                if (response.ok) {
                    setFavoriteIds((prev) => {
                        // Verificar duplicados antes de agregar
                        if (prev.includes(mascotaId)) return prev;
                        const newIds = [...prev, mascotaId];
                        console.log('Agregado a favoritos:', mascotaId, 'Nueva lista:', newIds);
                        return newIds;
                    });
                } else {
                    console.error('Error al agregar a favoritos:', data.message);
                    // Solo mostrar alert en errores no esperados
                    if (response.status !== 409) {
                        // 409 = Conflict (ya existe)
                        alert(data.message || 'Error al agregar a favoritos');
                    }
                }
            } catch (error) {
                console.error('Error al agregar a favoritos:', error);
                alert('Error de conexión al agregar a favoritos');
            } finally {
                setIsLoading(false);
            }
        },
        [favoriteSet, isLoading],
    );

    const removeFromFavorites = useCallback(
        async (mascotaId: number) => {
            // Evitar llamadas innecesarias
            if (!favoriteSet.has(mascotaId) || isLoading) return;

            setIsLoading(true);
            try {
                const response = await fetch('/favoritos', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({ mascota_id: mascotaId }),
                });

                const data = await response.json();

                if (response.ok) {
                    setFavoriteIds((prev) => {
                        const newIds = prev.filter((id) => id !== mascotaId);
                        console.log('Removido de favoritos:', mascotaId, 'Nueva lista:', newIds);
                        return newIds;
                    });
                } else {
                    console.error('Error al remover de favoritos:', data.message);
                    // Solo mostrar alert en errores no esperados
                    if (response.status !== 404) {
                        // 404 = Not Found (no existe)
                        alert(data.message || 'Error al remover de favoritos');
                    }
                }
            } catch (error) {
                console.error('Error al remover de favoritos:', error);
                alert('Error de conexión al remover de favoritos');
            } finally {
                setIsLoading(false);
            }
        },
        [favoriteSet, isLoading],
    );

    const toggleFavorite = useCallback(
        async (mascotaId: number) => {
            console.log('Toggle favorito:', mascotaId, 'Es favorito actual:', isFavorite(mascotaId));
            if (isFavorite(mascotaId)) {
                await removeFromFavorites(mascotaId);
            } else {
                await addToFavorites(mascotaId);
            }
        },
        [isFavorite, addToFavorites, removeFromFavorites],
    );

    const value = {
        favoriteIds,
        isLoading,
        isInitialized,
        isFavorite,
        toggleFavorite,
        addToFavorites,
        removeFromFavorites,
        refreshFavorites,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
