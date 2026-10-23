// Server-side contact form handler for SR CODE LABS
// Compatible with Vercel Serverless Functions, Netlify Functions, and Node.js server.js

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Simple in-memory rate limiting map (IP based)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

module.exports = async function handler(req, res) {
  // Set CORS and JSON response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({
      success: false,
      error: 'Method Not Allowed. Only POST requests are accepted.'
    }));
  }

  // Rate limiting check
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const clientRate = rateLimitMap.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientRate.resetTime) {
    clientRate.count = 1;
    clientRate.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    clientRate.count += 1;
  }
  rateLimitMap.set(clientIp, clientRate);

  if (clientRate.count > MAX_REQUESTS_PER_WINDOW) {
    res.statusCode = 429;
    return res.end(JSON.stringify({
      success: false,
      error: 'Too many requests. Please wait a minute before submitting again, or email info@srcodelab.space directly.'
    }));
  }

  try {
    let body = req.body;
    // Parse body if it's a string
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        res.statusCode = 400;
        return res.end(JSON.stringify({
          success: false,
          error: 'Malformed JSON payload.'
        }));
      }
    }

    if (!body || typeof body !== 'object') {
      res.statusCode = 400;
      return res.end(JSON.stringify({
        success: false,
        error: 'Request body must be a valid JSON object.'
      }));
    }

    // 1. Spam protection: Honeypot check
    if (body._gotcha && body._gotcha.trim() !== '') {
      // Discard bot submission silently
      res.statusCode = 200;
      return res.end(JSON.stringify({
        success: true,
        message: 'Submission received.'
      }));
    }

    const { name, email, company, phone, service, budget, timeline, message } = body;

    // 2. Server-side validation
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters).');
    } else if (name.trim().length > 100) {
      errors.push('Full name must be under 100 characters.');
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      errors.push('A valid contact email address is required.');
    } else if (email.trim().length > 100) {
      errors.push('Email address must be under 100 characters.');
    }

    if (!service || typeof service !== 'string' || service.trim().length < 2) {
      errors.push('Please select the service required.');
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.push('Project description must be at least 10 characters.');
    } else if (message.trim().length > 5000) {
      errors.push('Project description must be under 5000 characters.');
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      return res.end(JSON.stringify({
        success: false,
        error: errors.join(' ')
      }));
    }

    // 3. Environment check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[SR CODE LABS API] RESEND_API_KEY is not defined in server environment.');
      res.statusCode = 503;
      return res.end(JSON.stringify({
        success: false,
        error: 'Email delivery service is currently not configured on the server. Please email info@srcodelab.space directly.'
      }));
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'info@srcodelab.space';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'SR CODE LABS <onboarding@resend.dev>';

    const cleanName = sanitize(name.trim());
    const cleanEmail = email.trim();
    const cleanCompany = sanitize((company || 'Not specified').trim());
    const cleanPhone = sanitize((phone || 'Not provided').trim());
    const cleanService = sanitize((service || 'General Enquiry').trim());
    const cleanBudget = sanitize((budget || 'Flexible / Not specified').trim());
    const cleanTimeline = sanitize((timeline || 'Flexible').trim());
    const cleanMessage = sanitize(message.trim());
    const timestamp = new Date().toUTCString();

    // 4. Construct professional HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0F172A; background-color: #F8FAFC; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.15); overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%); padding: 24px 28px; color: #FFFFFF; }
            .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; font-weight: 700; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 26px 28px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
            .field-group { margin-bottom: 16px; }
            .label { font-size: 11.5px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0F172A; font-weight: 500; }
            .message-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; font-size: 14.5px; color: #1E293B; white-space: pre-wrap; word-break: break-word; line-height: 1.6; }
            .footer { padding: 18px 28px; background: #F1F5F9; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B; text-align: center; }
            .badge { display: inline-block; background: rgba(124, 58, 237, 0.1); color: #7C3AED; font-weight: 600; padding: 3px 10px; border-radius: 12px; font-size: 12.5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>SR CODE LABS · New Client Project Enquiry</h1>
              <p>Received: ${timestamp}</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Client Name</div>
                <div class="value">${cleanName}</div>
              </div>
              <div class="field-group">
                <div class="label">Contact Email (Reply-To)</div>
                <div class="value"><a href="mailto:${cleanEmail}" style="color: #7C3AED; text-decoration: none; font-weight: 600;">${cleanEmail}</a></div>
              </div>
              <div style="display: flex; gap: 24px; margin-bottom: 16px;">
                <div>
                  <div class="label">Company / Business</div>
                  <div class="value">${cleanCompany}</div>
                </div>
                <div>
                  <div class="label">Phone Number</div>
                  <div class="value">${cleanPhone}</div>
                </div>
              </div>
              <div class="field-group">
                <div class="label">Service Required</div>
                <div class="value"><span class="badge">${cleanService}</span></div>
              </div>
              <div style="display: flex; gap: 24px; margin-bottom: 16px;">
                <div>
                  <div class="label">Estimated Budget</div>
                  <div class="value">${cleanBudget}</div>
                </div>
                <div>
                  <div class="label">Expected Timeline</div>
                  <div class="value">${cleanTimeline}</div>
                </div>
              </div>
              <div class="field-group">
                <div class="label">Project Description & Requirements</div>
                <div class="message-box">${cleanMessage}</div>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;">Hit Reply to respond directly to <strong>${cleanName}</strong> at <strong>${cleanEmail}</strong>.</p>
              <p style="margin: 6px 0 0;">Sent via SR CODE LABS Website (<a href="https://www.srcodelab.space/" style="color: #7C3AED;">srcodelab.space</a>)</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
NEW CLIENT PROJECT ENQUIRY - SR CODE LABS
==========================================
Timestamp: ${timestamp}
Name: ${cleanName}
Email: ${cleanEmail}
Company: ${cleanCompany}
Phone: ${cleanPhone}
Service: ${cleanService}
Budget: ${cleanBudget}
Timeline: ${cleanTimeline}

PROJECT DESCRIPTION:
${cleanMessage}

------------------------------------------
Reply directly to ${cleanEmail}.
Sent via https://www.srcodelab.space/
    `.trim();

    // 5. Dispatch email via Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: cleanEmail,
        subject: `New Project Enquiry: ${cleanName} - ${cleanService}`,
        html: htmlContent,
        text: textContent
      })
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error('[SR CODE LABS API] Resend API Error:', resendData);
      res.statusCode = 502;
      return res.end(JSON.stringify({
        success: false,
        error: resendData.message || 'Email delivery service could not process the message. Please contact info@srcodelab.space directly.'
      }));
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({
      success: true,
      message: 'Your enquiry has been received by SR CODE LABS. We will review your requirements and respond within 24 hours.',
      id: resendData.id
    }));
  } catch (err) {
    console.error('[SR CODE LABS API] Server error processing enquiry:', err);
    res.statusCode = 500;
    return res.end(JSON.stringify({
      success: false,
      error: 'An internal server error occurred while processing your enquiry. Please email info@srcodelab.space directly.'
    }));
  }
};
