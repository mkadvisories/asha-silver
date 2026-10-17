import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api-handler',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              // Server-side logging of video call consultation details dispatched to mkadvisories@gmail.com
              // Notice: recipient mkadvisories@gmail.com is kept strictly internal on the server
              console.log(
                '[Asha Silver Atelier Concierge] Video Consultation Details Dispatched to mkadvisories@gmail.com:',
                {
                  id: data.id,
                  name: data.name,
                  phone: data.phone,
                  email: data.email,
                  date: data.date,
                  timeSlot: data.timeSlot,
                  platform: data.platform,
                  category: data.category,
                  message: data.message,
                  recipient: 'mkadvisories@gmail.com',
                  timestamp: new Date().toISOString(),
                }
              );
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  bookingId: data.id,
                  status: 'dispatched_to_concierge',
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid booking data' }));
            }
          });
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', service: 'Asha Silver Contact API' }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), contactApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
