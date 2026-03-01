"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Share2, Heart, X, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import wallpapersData from "@/wallpapers.json";
import { useFavorites } from "@/hooks/use-favorites";

export function WallpaperDetail({ id, isModal = false }: { id: string; isModal?: boolean }) {
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavorites();
    const wallpaper = wallpapersData.find((w) => w.id === id);

    if (!wallpaper) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-white">
                Wallpaper not found.
            </div>
        );
    }

    const handleClose = () => {
        if (isModal) {
            router.back();
        } else {
            router.push("/");
        }
    };

    const isLiked = isFavorite(wallpaper.id);

    return (
        <div className={`relative w-full ${isModal ? "h-fit max-h-[90vh]" : "min-h-screen"} flex flex-col md:flex-row bg-[#0B0B0F] overflow-hidden`}>
            {/* Dynamic Ambient Background Blur */}
            {isModal && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <Image
                        src={wallpaper.src.replace('/public', '')}
                        alt="ambient"
                        fill
                        className="object-cover opacity-20 blur-3xl scale-110 saturate-150"
                    />
                </div>
            )}

            {/* Main Image Presenter */}
            <div className="relative z-10 w-full md:w-2/3 lg:w-3/4 flex items-center justify-center p-4 md:p-8 bg-black/40">
                <motion.div
                    layoutId={`card-${wallpaper.id}`}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-2xl"
                >
                    <Image
                        src={wallpaper.src.replace('/public', '')}
                        alt={wallpaper.name}
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                </motion.div>

                {/* Navigation Elements */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 z-50 hover:scale-105"
                >
                    {isModal ? <X size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Metadata Panel */}
            <div className="relative z-10 w-full md:w-1/3 lg:w-1/4 bg-[#0B0B0F]/90 backdrop-blur-2xl border-l border-white/5 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="flex-1">
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3 block">
                        {wallpaper.category}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight mb-2">
                        {wallpaper.name}
                    </h1>
                    <p className="text-white/60 text-sm leading-relaxed mb-8">
                        High-resolution atmospheric wallpaper optimized for modern desktop environments. Note: This artwork is strictly curated for personal usage.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-white/50 text-sm">Resolution</span>
                            <span className="text-white tracking-wide font-medium text-sm">4K Ultra HD</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-white/50 text-sm">Format</span>
                            <span className="text-white tracking-wide font-medium text-sm uppercase">JPG / PNG</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-white/50 text-sm">License</span>
                            <span className="text-white tracking-wide font-medium text-sm">Free (Personal)</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mt-8">
                    <a
                        href={wallpaper.src.replace('/public', '')}
                        download={wallpaper.id}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors duration-300"
                    >
                        <Download size={18} /> Download High-Res
                    </a>

                    <div className="flex gap-3">
                        <button
                            onClick={() => toggleFavorite(wallpaper.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl glass hover:bg-white/10 font-medium transition-colors duration-300 ${isLiked ? 'text-red-500 hover:text-red-400' : 'text-white'}`}
                        >
                            <Heart size={18} fill={isLiked ? "currentColor" : "none"} /> {isLiked ? "Saved" : "Like"}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl glass hover:bg-white/10 text-white font-medium transition-colors duration-300">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
