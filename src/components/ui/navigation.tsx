"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";

export function Navigation() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Derive background opacity and backdrop blur based on scroll
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
    const blurValue = useTransform(scrollY, [0, 100], [0, 16]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 w-full z-50 transition-colors duration-500 border-b ${isScrolled ? "border-white/5" : "border-transparent"
                }`}
            style={{
                backgroundColor: `rgba(11, 11, 15, ${bgOpacity.get()})`,
                backdropFilter: `blur(${blurValue.get()}px)`,
                WebkitBackdropFilter: `blur(${blurValue.get()}px)`,
            }}
        >
            <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="text-xl font-display font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
                        Atmos
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Explore</Link>
                        <Link href="/" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Categories</Link>
                        <Link href="/" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Collections</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <Search size={18} />
                    </button>
                    <button className="hidden sm:flex px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/5 text-sm font-medium transition-all duration-300">
                        Submit
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
