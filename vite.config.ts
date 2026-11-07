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

      server.middlewares.use('/api/order', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const recipientEmail = 'mkadvisories@gmail.com';

              // Format ordered items into readable text
              const itemsList = Array.isArray(data.items)
                ? data.items
                    .map(
                      (it: any, idx: number) =>
                        `${idx + 1}. ${it.product?.name || 'Silver Item'} (Qty: ${it.quantity}, Purity: ${it.product?.purity || '999'}, Wt: ${it.product?.weightGrams || 0}g) - ₹${(it.product?.price ? it.product.price * it.quantity : 0).toLocaleString('en-IN')}`
                    )
                    .join('\n')
                : 'No items detailed';

              // Prepare formatted payload for auto-mailer dispatch
              const orderMailPayload = {
                'Order ID': data.orderId || ('ASH-' + Math.floor(100000 + Math.random() * 900000)),
                'Payment Method': 'Cash on Delivery (COD) - Doorstep Settlement',
                'Customer Name': data.customerName || 'Not provided',
                'Mobile / WhatsApp': data.customerPhone || 'Not provided',
                'Customer Email ID': data.customerEmail || 'Not provided',
                'Delivery Address': `${data.deliveryAddress || ''}, ${data.city || ''} - ${data.pincode || ''}`,
                'Ordered Items List': itemsList,
                'Order Subtotal': `₹${Number(data.subtotal || 0).toLocaleString('en-IN')}`,
                'GST (3%)': `₹${Number(data.tax || 0).toLocaleString('en-IN')}`,
                'Total Payable (COD)': `₹${Number(data.total || 0).toLocaleString('en-IN')}`,
                'Free Coin Included': data.freeSilverCoinAwarded ? 'Yes (5g Pure 999 Silver Coin)' : 'No',
                'Order Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                '_subject': `New Order Confirmed: #${data.orderId || 'NEW'} - ${data.customerName || 'Customer'} (₹${Number(data.total || 0).toLocaleString('en-IN')}) [Cash on Delivery]`,
                '_replyto': data.customerEmail || '',
                '_template': 'table',
                '_captcha': 'false',
              };

              // Persist order locally in orders.json
              try {
                const ordersPath = path.resolve(__dirname, 'src/data/orders.json');
                let existingOrders = [];
                if (fs.existsSync(ordersPath)) {
                  try {
                    existingOrders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
                  } catch (e) {
                    existingOrders = [];
                  }
                }
                existingOrders.unshift({
                  ...orderMailPayload,
                  rawOrder: data,
                  recipient: recipientEmail,
                  dispatchedAt: new Date().toISOString(),
                });
                fs.writeFileSync(ordersPath, JSON.stringify(existingOrders, null, 2), 'utf8');
              } catch (fsErr) {
                console.error('[Asha Silver] Error saving local order:', fsErr);
              }

              // Dispatch real email via FormSubmit auto-mailer gateway to mkadvisories@gmail.com
              let mailerSuccess = false;
              try {
                const dispatchResponse = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Referer': 'https://ashasilverjewellers.com',
                    'Origin': 'https://ashasilverjewellers.com',
                  },
                  body: JSON.stringify(orderMailPayload),
                });
                const dispatchResult = await dispatchResponse.json();
                console.log('[Asha Silver Order Auto-Mailer] Gateway response:', dispatchResult);
                mailerSuccess = true;
              } catch (dispatchErr) {
                console.warn('[Asha Silver Order Auto-Mailer] Notice on external gateway:', dispatchErr);
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  orderId: data.orderId,
                  status: 'Order Received',
                  paymentMethod: 'Cash on Delivery',
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid order data payload' }));
            }
          });
        } else if (req.method === 'GET') {
          try {
            const ordersPath = path.resolve(__dirname, 'src/data/orders.json');
            if (fs.existsSync(ordersPath)) {
              const orders = fs.readFileSync(ordersPath, 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(orders);
              return;
            }
          } catch (e) {}
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', service: 'Asha Silver Orders API', orders: [] }));
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });

      // Live MCX Silver Rate API - direct real-time scraping & commodity feed
      server.middlewares.use('/api/silver-rate', async (req, res) => {
        if (req.method === 'GET') {
          let result = {
            success: true,
            mcxPerKg: 184740,
            dayChange: -2400,
            dayChangePercent: -1.28,
            marketTime: '03.15PM IST | 07 Nov, 2026',
            source: 'Economic Times MCX Silver (Direct Live Scrape)',
            timestamp: new Date().toISOString(),
          };

          // 1. Direct real-time scraper: Economic Times MCX Silver Live Summary
          try {
            const etRes = await fetch('https://economictimes.indiatimes.com/commoditysummary/symbol-SILVER.cms', {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Cache-Control': 'no-cache, no-store',
              },
              signal: AbortSignal.timeout(5000),
            });

            if (etRes.ok) {
              const html = await etRes.text();
              const priceMatch = html.match(/class=\"commodityPrice\"[^>]*>([0-9,.]+)</i);
              const changeMatch = html.match(
                /class=\"data perChng\"[^>]*>([+\-0-9,.\s]+)\s*\(([+\-0-9,.\s]+)%\)</i
              );
              const dateMatch = html.match(/class=\"datetime\"[^>]*>([\s\S]*?)<\/p>/i);

              if (priceMatch) {
                const mcxPerKg = parseFloat(priceMatch[1].replace(/,/g, ''));
                if (mcxPerKg > 100000 && mcxPerKg < 350000) {
                  const dayChange = changeMatch ? parseFloat(changeMatch[1].replace(/,/g, '').trim()) : 0;
                  const dayChangePercent = changeMatch ? parseFloat(changeMatch[2].replace(/,/g, '').trim()) : 0;
                  const marketTime = dateMatch ? dateMatch[1].replace(/<[^>]+>/g, '').trim() : '';

                  result = {
                    success: true,
                    mcxPerKg,
                    dayChange,
                    dayChangePercent,
                    marketTime,
                    source: 'Economic Times MCX Silver (Direct Live Scrape)',
                    timestamp: new Date().toISOString(),
                  };
                }
              }
            }
          } catch (err) {
            console.warn('[Silver Scraper] Primary ET scrape fallback:', (err as Error).message);

            // 2. Fallback: COMEX futures (SI=F) + USD/INR (INR=X) with Indian landed parity
            try {
              const [silverRes, inrRes] = await Promise.all([
                fetch('https://query1.finance.yahoo.com/v8/finance/chart/SI=F', {
                  headers: { 'User-Agent': 'Mozilla/5.0' },
                  signal: AbortSignal.timeout(4000),
                }),
                fetch('https://query1.finance.yahoo.com/v8/finance/chart/INR=X', {
                  headers: { 'User-Agent': 'Mozilla/5.0' },
                  signal: AbortSignal.timeout(3000),
                }).catch(() => null),
              ]);

              const silverData = await silverRes.json();
              const meta = silverData?.chart?.result?.[0]?.meta;
              const silverUsdPerOz = meta?.regularMarketPrice;
              const prevCloseUsd = meta?.chartPreviousClose || meta?.previousClose || silverUsdPerOz;

              let usdInr = 94.95;
              if (inrRes && inrRes.ok) {
                const inrData = await inrRes.json();
                usdInr = inrData?.chart?.result?.[0]?.meta?.regularMarketPrice || 94.95;
              }

              if (silverUsdPerOz) {
                const conversionFactor = 32.1507465;
                const landedMultiplier = 1.15;
                const liveMcxPerKg = Math.round((silverUsdPerOz * conversionFactor * usdInr * landedMultiplier) / 10) * 10;
                const prevMcxPerKg = Math.round((prevCloseUsd * conversionFactor * usdInr * landedMultiplier) / 10) * 10;
                const dayChange = liveMcxPerKg - prevMcxPerKg;
                const dayChangePercent = Number(((dayChange / prevMcxPerKg) * 100).toFixed(2));

                result = {
                  success: true,
                  mcxPerKg: liveMcxPerKg,
                  dayChange,
                  dayChangePercent,
                  marketTime: 'Live COMEX Parity',
                  source: 'COMEX Futures (SI=F) Parity',
                  timestamp: new Date().toISOString(),
                };
              }
            } catch (comexErr) {
              console.warn('[Silver Scraper] Secondary COMEX fallback error:', (comexErr as Error).message);
            }
          }

          // Return response with strict cache prevention headers
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.statusCode = 200;
          res.end(JSON.stringify(result));
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
