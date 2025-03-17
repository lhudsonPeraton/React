import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react(),
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code,id) {
                if (!id.match(/src\/.*\.js$/)) {
                    return null;
                }
                return transformWithEsbuild(code, id, {
                    loader: "jsx",
                    jsx: 'automatic',
                });
            }
        }
    ],
    build: {
        outDir: 'build'
    },
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            }
        }
    }
})