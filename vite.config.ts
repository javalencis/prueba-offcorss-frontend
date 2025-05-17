import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    // Cualquier ruta que empiece con '/api-vtex' será redirigida
    '/api-vtex': {
      target: 'https://offcorss.myvtex.com', // El servidor al que realmente quieres llamar
      changeOrigin: true, // Necesario para que el servidor de destino no rechace la solicitud por ser de un origen diferente
      rewrite: (path) => path.replace(/^\/api-vtex/, ''), // Elimina '/api-vtex' de la URL antes de enviarla al target
      // secure: false, // Descomenta esto si la API de VTEX usa HTTPS y tienes problemas con certificados autofirmados (poco común para VTEX)
    }
  }
}
})
