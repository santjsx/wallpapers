"use client";

import { useState } from "react";
import { ImageCard } from "@/components/ui/image-card";
import wallpapersData from "@/wallpapers.json";

export function Gallery() {
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(wallpapersData.map((w) => w.category)))];

    const filteredWallpapers = filter === "All"
        ? wallpapersData
        : wallpapersData.filter((w) => w.category === filter);

    return (
        <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12 min-h-screen">

            {/* Filters Sticky Bar */}
            <div className="flex items-center justify-center md:justify-start gap-2 overflow-x-auto pb-8 scrollbar-hide sticky top-20 z-40 bg-[#0B0B0F]/90 backdrop-blur-md pt-4 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex gap-2 w-max px-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filteredWallpapers.map((wallpaper, idx) => (
                    <ImageCard
                        key={wallpaper.id}
                        id={wallpaper.id}
                        src={wallpaper.src.replace('/public', '')} // Handling paths from metadata script
                        name={wallpaper.name}
                        category={wallpaper.category}
                        priority={idx < 8} // Preload the first few images
                    />
                ))}
                {filteredWallpapers.length === 0 && (
                    <div className="col-span-full py-32 text-center text-zinc-500">
                        No atmospheric collections found for this category.
                    </div>
                )}
            </div>
        </section>
    );
}
