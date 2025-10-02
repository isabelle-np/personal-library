import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate critical environment variables
if (!process.env.FIREBASE_DATABASE_URL) {
  throw new Error('Missing required environment variable: FIREBASE_DATABASE_URL');
}
if (!process.env.BUILD_OUTPUT_DIR) {
  throw new Error('Missing required environment variable: BUILD_OUTPUT_DIR');
}
const port = Number(process.env.PORT);
if (isNaN(port)) {
  throw new Error('Invalid PORT environment variable. Must be a number.');
}

export default defineConfig({
  // Define plugins to enhance Vite's functionality
  plugins: [
    react(),
  ],
  resolve: {
    // Specify file extensions for module resolution
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Target modern JavaScript for better performance
    target: 'esnext',
    // Default output directory for build artifacts
    outDir: process.env.BUILD_OUTPUT_DIR || 'dist',
  },
  server: {
    // Use environment variable for port configuration
    port: parseInt(process.env.PORT || '3000', 10),
    open: true,
  },
  define: {
    // Expose only necessary environment variables to the client-side for security
    'process.env.API_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
    'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
    'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
    'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
    'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
    'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
  },
});