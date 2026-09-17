// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Adaptador de Netlify: permite que páginas puntuales se rendericen
  // en el momento (SSR) mientras el resto del sitio sigue siendo estático.
  // Así el contenido cargado desde el panel admin se ve al instante,
  // sin gastar minutos/créditos de build en cada cambio.
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
});