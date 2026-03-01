import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Maximize2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import wallpapersData from './wallpapers.json';

const ITEMS_PER_PAGE = 24;

function ImageWithSkeleton({ src, alt, className }: { src: string, alt: string, className?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className="relative w-full h-full bg-white/5">
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/10 rounded-inherit" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
            />
        </div>
    );
}

function App() {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [filter, setFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const categories = ['All', ...Array.from(new Set(wallpapersData.map(w => w.category)))];

    const filteredWallpapers = filter === 'All'
        ? wallpapersData
        : wallpapersData.filter(w => w.category === filter);

    const totalPages = Math.ceil(filteredWallpapers.length / ITEMS_PER_PAGE);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const currentItems = filteredWallpapers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (selectedImage) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selectedImage]);

    return (
        <div className="min-h-screen bg-[#050505] text-white/90 selection:bg-white/20 font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 pt-6 pb-4 px-4 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                            Atmos
                        </h1>
                        <div className="flex items-center gap-3 md:gap-4">
                            <a
                                href="https://github.com/santjsx/wallpapers/archive/refs/heads/main.zip"
                                className="text-xs md:text-sm font-medium text-black bg-white/90 hover:bg-white px-3 md:px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                                title="Download the entire repository as a ZIP"
                            >
                                <Download size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">Download All</span>
                            </a>
                            <a href="https://github.com/santjsx/wallpapers" className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1.5" target="_blank" rel="noreferrer">
                                <ExternalLink size={14} /> <span className="hidden sm:inline">GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-[13px] md:text-sm font-medium transition-all whitespace-nowrap ${filter === cat
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Gallery Grid */}
            <main className="pt-36 md:pt-40 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen flex flex-col">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mb-16 flex-grow">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((wallpaper, index) => (
                            <motion.div
                                layoutId={`card-${wallpaper.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: (index % ITEMS_PER_PAGE) * 0.05, ease: [0.23, 1, 0.32, 1] }}
                                key={wallpaper.id}
                                className="relative group block rounded-2xl overflow-hidden bg-[#111] cursor-zoom-in break-inside-avoid"
                                onClick={() => setSelectedImage(wallpaper)}
                            >
                                <div className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105">
                                    <ImageWithSkeleton
                                        src={wallpaper.src}
                                        alt={wallpaper.name}
                                        className="w-full h-auto block"
                                    />
                                </div>

                                {/* Meta Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
                                    <div className="flex justify-between items-end gap-2">
                                        <div className="min-w-0">
                                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-1.5 block">{wallpaper.category}</span>
                                            <h3 className="text-sm font-medium text-white/90 truncate">{wallpaper.name}</h3>
                                        </div>
                                        <a
                                            href={wallpaper.src}
                                            download={wallpaper.id}
                                            onClick={(e) => e.stopPropagation()}
                                            className="shrink-0 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all sm:translate-y-2 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
                                            title="Download"
                                        >
                                            <Download size={16} strokeWidth={2.5} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-auto">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-white text-black'
                                        : 'bg-white/5 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </main>

            {/* Footer Disclaimer */}
            <footer className="w-full text-center py-12 px-6 border-t border-white/5 bg-[#050505]/50 backdrop-blur-sm">
                <p className="max-w-3xl mx-auto text-sm text-white/40 leading-relaxed font-medium">
                    <span className="text-white/70 block mb-2 text-base font-semibold">Disclaimer</span>
                    I do not own any of the wallpapers displayed in this gallery. This is strictly a personal collection curated from various free sources across the internet. All rights, copyrights, and intellectual property belong to their respective original artists, creators, and platform publishers.
                    <br /><br />
                    If you are the original creator of any artwork provided here and would like it removed or properly credited, please <a href="https://github.com/santjsx/wallpapers/issues" className="text-white hover:underline transition-colors" target="_blank" rel="noreferrer">open an issue on GitHub</a> and I will address it immediately.
                </p>
            </footer>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            layoutId={`card-${selectedImage.id}`}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            className="relative max-w-7xl w-full max-h-full flex flex-col items-center justify-center p-2 md:p-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full flex justify-center">
                                <ImageWithSkeleton
                                    src={selectedImage.src}
                                    alt={selectedImage.name}
                                    className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                />
                            </div>

                            <div className="w-full mt-4 md:mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111] p-4 rounded-xl border border-white/10">
                                <div>
                                    <h2 className="text-base md:text-lg font-medium text-white">{selectedImage.name}</h2>
                                    <p className="text-xs md:text-sm text-white/50 uppercase tracking-widest mt-1">{selectedImage.category}</p>
                                </div>

                                <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                                    <a
                                        href={selectedImage.src}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 md:flex-none flex justify-center items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                                        title="Open Original"
                                    >
                                        <Maximize2 size={20} />
                                    </a>
                                    <a
                                        href={selectedImage.src}
                                        download={selectedImage.id}
                                        className="flex-[2] md:flex-none flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                                    >
                                        <Download size={18} /> Download
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
