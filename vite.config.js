import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react(),
        {
            //This app was migrated from create-react-app to Vite. Vite does not enable JSX to JS by default.
            //We added this configuration, and made other modifications, as described here: https://medium.com/@ivmarcos/migrate-your-react-app-from-create-react-app-to-vite-for-blazing-fast-development-7fe06de0bcc6
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