"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("atmos_favorites");
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => {
            let newFavorites;
            if (prev.includes(id)) {
                newFavorites = prev.filter((fId) => fId !== id);
            } else {
                newFavorites = [...prev, id];
            }
            localStorage.setItem("atmos_favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite, isLoaded };
}
