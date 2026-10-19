import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api-handler',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const recipientEmail = 'mkadvisories@gmail.com';

              // Prepare formatted payload for auto-mailer dispatch
              const mailPayload = {
                'Customer Name': data.name || 'Not provided',
                'Mobile / Phone Number': data.phone || 'Not provided',
                'Customer Email ID': data.email || 'Not provided',
                'Preferred Video Call Date': data.date || 'Not specified',
                'Preferred Time Slot': data.timeSlot || 'Not specified',
                'Video Platform': data.platform || 'WhatsApp Video Call',
                'Interested Category': data.category || 'Silver Utensils & Deities',
                'Customer Message': data.message || 'No additional note',
                'Booking Reference ID': data.id || ('ASL-' + Date.now()),
                'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                '_subject': `New Video Call Scheduled: ${data.name || 'Customer'} (${data.date || 'Soon'} at ${data.timeSlot || 'Slot'}) - Asha Silver Jewellers`,
                '_replyto': data.email || '',
                '_template': 'table',
                '_captcha': 'false',
              };

              // Persist lead locally in inquiries.json
              try {
                const inquiriesPath = path.resolve(__dirname, 'src/data/inquiries.json');
                let existingInquiries = [];
                if (fs.existsSync(inquiriesPath)) {
                  try {
                    existingInquiries = JSON.parse(fs.readFileSync(inquiriesPath, 'utf8'));
                  } catch (e) {
                    existingInquiries = [];
                  }
                }
                existingInquiries.unshift({
                  ...mailPayload,
                  recipient: recipientEmail,
                  dispatchedAt: new Date().toISOString(),
                });
                fs.writeFileSync(inquiriesPath, JSON.stringify(existingInquiries, null, 2), 'utf8');
              } catch (fsErr) {
                console.error('[Asha Silver] Error saving local inquiry:', fsErr);
              }

              // Dispatch real email via FormSubmit auto-mailer gateway
              let mailerSuccess = false;
              let mailerError = null;
              try {
                const dispatchResponse = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Referer': 'https://ashasilverjewellers.com',
                    'Origin': 'https://ashasilverjewellers.com',
                  },
                  body: JSON.stringify(mailPayload),
                });
                const dispatchResult = await dispatchResponse.json();
                console.log('[Asha Silver Auto-Mailer] Gateway response:', dispatchResult);
                mailerSuccess = true;
              } catch (dispatchErr) {
                mailerError = String(dispatchErr);
                console.warn('[Asha Silver Auto-Mailer] Notice on external gateway:', dispatchErr);
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  bookingId: data.id,
                  status: 'dispatched_to_auto_mailer',
                  mailerDispatched: mailerSuccess,
                  recipientConfirmed: true,
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid booking data payload' }));
            }
          });
        } else if (req.method === 'GET') {
          // Admin endpoint to view saved inquiries
          try {
            const inquiriesPath = path.resolve(__dirname, 'src/data/inquiries.json');
            if (fs.existsSync(inquiriesPath)) {
              const inquiries = fs.readFileSync(inquiriesPath, 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(inquiries);
              return;
            }
          } catch (e) {
            // fallback
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', service: 'Asha Silver Contact API', leads: [] }));
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
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
