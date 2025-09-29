import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@radix-ui/react-dialog': '@radix-ui/react-dialog',
      '@radix-ui/react-tabs': '@radix-ui/react-tabs',
      'class-variance-authority': 'class-variance-authority',
      'clsx': 'clsx',
      'embla-carousel-react': 'embla-carousel-react',
      'lucide-react': 'lucide-react',
      'tailwind-merge': 'tailwind-merge',
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});