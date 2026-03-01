import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Maximize2, ExternalLink } from 'lucide-react';
import wallpapersData from './wallpapers.json';

function App() {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(wallpapersData.map(w => w.category)))];

    const filteredWallpapers = filter === 'All'
        ? wallpapersData
        : wallpapersData.filter(w => w.category === filter);

    useEffect(() => {
        if (selectedImage) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selectedImage]);

    return (
        <div className="min-h-screen bg-[#050505] text-white/90 selection:bg-white/20 font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 pt-8 pb-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                            Santhoshhh Wallpapers
                        </h1>
                        <a href="https://github.com/santhoshhh/wallpapers" className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2" target="_blank" rel="noreferrer">
                            <ExternalLink size={16} /> GitHub
                        </a>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === cat
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
            <main className="pt-40 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    <AnimatePresence>
                        {filteredWallpapers.map((wallpaper, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index % 15 * 0.05 }}
                                key={wallpaper.id}
                                className="relative group block rounded-2xl overflow-hidden bg-white/5 cursor-zoom-in break-inside-avoid"
                                onClick={() => setSelectedImage(wallpaper)}
                            >
                                <img
                                    src={wallpaper.src}
                                    alt={wallpaper.name}
                                    loading="lazy"
                                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Meta Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <span className="text-xs uppercase tracking-wider text-white/70 font-medium mb-1">{wallpaper.category}</span>
                                    <h3 className="text-sm font-medium text-white truncate">{wallpaper.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            layoutId={`img-${selectedImage.id}`}
                            className="relative max-w-7xl w-full max-h-full flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.name}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />

                            <div className="w-full mt-6 flex justify-between items-center bg-[#111] p-4 rounded-xl border border-white/10">
                                <div>
                                    <h2 className="text-lg font-medium text-white">{selectedImage.name}</h2>
                                    <p className="text-sm text-white/50 uppercase tracking-widest mt-1">{selectedImage.category}</p>
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={selectedImage.src}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex justify-center flex-col p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                                        title="Open Original"
                                    >
                                        <Maximize2 size={20} />
                                    </a>
                                    <a
                                        href={selectedImage.src}
                                        download={selectedImage.id}
                                        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
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
