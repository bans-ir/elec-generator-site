import svgr from '@svgr/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'Mimix',
                short_name: 'Mimix',
                theme_color: '#203933',
                icons: [
                    {
                        src: '64-64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: '192-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            }
        })
    ],
    optimizeDeps: {
        exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
    },
    resolve: {
        alias: {
            // Add your aliases here to match the paths in jsconfig.json
            // Ensure that these paths match the paths in jsconfig.json
            '@components': '/src/components',
            '@assets': '/src/assets',
            '@pages': '/src/pages',
            '@core': '/src/core',
            '@services': '/src/services'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg']
    }
})
