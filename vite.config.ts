import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,jpg,jpeg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/santhoshhh\.github\.io\/wallpapers\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'wallpaper-images-cache',
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    ],
    base: './', // For correct github pages or relative paths
});
