"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Abstract Ambient Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/5 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none" />
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-zinc-800/20 rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/4" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-white mb-6 text-glow">
                        Curated Visual <br className="hidden md:block" /> Atmospheres
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-lg md:text-xl text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
                        A premium collection of minimalist, cinematic, and design-forward outstanding desktop wallpapers.
                        Elevate your digital environment.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10"
                >
                    <button className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-transform hover:scale-105 active:scale-95">
                        Explore Collection
                    </button>
                </motion.div>
            </div>

            {/* Fade to background gradient at bottom */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0B0B0F] to-transparent z-10" />
        </section>
    );
}
