"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Maximize2 } from "lucide-react";

interface ImageCardProps {
    id: string;
    src: string;
    name: string;
    category: string;
    priority?: boolean;
}

export function ImageCard({ id, src, name, category, priority = false }: ImageCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={`/wallpaper/${id}`} scroll={false} className="block break-inside-avoid shadow-sm hover:shadow-2xl transition-shadow duration-500 rounded-2xl will-change-transform outline-none">
            <motion.div
                layoutId={`card-${id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative group rounded-2xl overflow-hidden bg-white/[0.02]"
            >
                <div className="relative w-full aspect-[4/5] sm:aspect-auto overflow-hidden">
                    {/* Skeleton pulse before image loads */}
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-inherit" />
                    )}

                    <Image
                        src={src}
                        alt={name}
                        width={800}
                        height={1200}
                        priority={priority}
                        className={`w-full h-auto object-cover transform transition-all duration-700 ease-in-out group-hover:scale-105 ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-xl"
                            }`}
                        onLoad={() => setIsLoaded(true)}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Ambient Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                    {/* Hover Controls */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <div className="flex justify-between items-end gap-4">
                            <div className="min-w-0">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium mb-1.5 block">
                                    {category}
                                </span>
                                <h3 className="text-sm font-medium text-white/90 truncate drop-shadow-md">
                                    {name}
                                </h3>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <div
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-colors duration-300"
                                    title="Expand"
                                >
                                    <Maximize2 size={16} strokeWidth={2} />
                                </div>
                                <a
                                    href={src}
                                    download={id}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-10 h-10 rounded-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center transition-colors duration-300 shadow-lg"
                                    title="Download Ultra HQ"
                                >
                                    <Download size={16} strokeWidth={2.5} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
