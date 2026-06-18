import nodemailer from 'nodemailer';

export async function sendSubmissionEmail(id: string, type: 'contact' | 'quote', data: any) {
  // Check if SMTP settings are configured. If not, log to console and return.
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(`[Mailer Warning] SMTP is not fully configured (SMTP_HOST, SMTP_USER, or SMTP_PASS missing). Skipping email send for submission ${id}.`);
    console.log('[Mailer Fallback] Submission data:', { id, type, data });
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const to = process.env.EMAIL_TO || 'hello@saaraindia.com';
  const from = process.env.EMAIL_FROM || `"SAARA Earthing Notifications" <${user}>`;

  // Format headers and titles
  const subject = type === 'quote' 
    ? `[SAARA Earthing] New Quote Request Spec (${data.company || 'Direct'})`
    : `[SAARA Earthing] New Contact Form Submission (${data.name})`;

  // Build the email body
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
          color: #1e293b;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .header {
          background-color: #060a14;
          padding: 32px 24px;
          text-align: center;
          border-bottom: 4px solid #d4af37;
        }
        .logo-text {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #ffffff;
          margin: 0;
        }
        .logo-sub {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: #d4af37;
          margin-top: 4px;
          text-transform: uppercase;
        }
        .content {
          padding: 32px 24px;
        }
        .badge {
          display: inline-block;
          padding: 6px 12px;
          background-color: #fef9c3;
          border: 1px solid #fef08a;
          color: #854d0e;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 4px;
          margin-bottom: 24px;
        }
        .intro {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .table-title {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .data-table td {
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
        }
        .label {
          font-weight: bold;
          color: #475569;
          width: 40%;
        }
        .value {
          color: #0f172a;
          width: 60%;
        }
        .footer {
          background-color: #f1f5f9;
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-text">SAARA EARTHING</div>
          <div class="logo-sub">Lightning Protection Systems</div>
        </div>
        <div class="content">
          <div class="badge">${type} Submission</div>
          <p class="intro">A new form submission has been received from the website. The details are documented below.</p>
          
          <div class="table-title">Partner Details</div>
          <table class="data-table">
            <tr>
              <td class="label">Submission ID</td>
              <td class="value">${id}</td>
            </tr>
            <tr>
              <td class="label">Name</td>
              <td class="value">${data.name || '-'}</td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td class="value"><a href="mailto:${data.email}">${data.email || '-'}</a></td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td class="value"><a href="tel:${data.phone}">${data.phone || '-'}</a></td>
            </tr>
            <tr>
              <td class="label">Company / Client</td>
              <td class="value">${data.company || '-'}</td>
            </tr>
  `;

  if (type === 'quote') {
    html += `
            <tr>
              <td class="label">Site Location</td>
              <td class="value">${data.location || '-'}</td>
            </tr>
          </table>
          
          <div class="table-title">Grounding Design Spec</div>
          <table class="data-table">
            <tr>
              <td class="label">System Type</td>
              <td class="value">${data.earthingSystemType || '-'}</td>
            </tr>
            <tr>
              <td class="label">Fault Current Rating</td>
              <td class="value">${data.faultCurrent ? `${data.faultCurrent} kA` : '-'}</td>
            </tr>
            <tr>
              <td class="label">Soil Resistivity</td>
              <td class="value">${data.soilResistivity ? `${data.soilResistivity} Ω·m` : '-'}</td>
            </tr>
          </table>

          <div class="table-title">Hardware & Volume</div>
          <table class="data-table">
            <tr>
              <td class="label">Electrode Size</td>
              <td class="value">${data.electrodeDiameter || '-'} / ${data.electrodeLength || '-'}</td>
            </tr>
            <tr>
              <td class="label">Electrode Quantity</td>
              <td class="value">${data.electrodeQty || '-'} units</td>
            </tr>
            <tr>
              <td class="label">Compound Quantity</td>
              <td class="value">${data.compoundQty || '-'} bags (25KG)</td>
            </tr>
            <tr>
              <td class="label">Earth Pit Chamber</td>
              <td class="value">${data.inspectionChamber || '-'}</td>
            </tr>
            <tr>
              <td class="label">Clamps & U-Bolts Included</td>
              <td class="value">${data.clampsNeeded ? 'Yes' : 'No'}</td>
            </tr>
          </table>

          <div class="table-title">Lightning Arrester</div>
          <table class="data-table">
            <tr>
              <td class="label">Arrester Model</td>
              <td class="value">${data.arresterType || '-'}</td>
            </tr>
            <tr>
              <td class="label">Arrester Quantity</td>
              <td class="value">${data.arresterQty || '0'} units</td>
            </tr>
          </table>

          <div class="table-title">Additional Info</div>
          <table class="data-table">
            <tr>
              <td class="label">Calculated Estimate</td>
              <td class="value" style="font-weight: bold; color: #b8860b;">₹${data.estimatedPrice ? data.estimatedPrice.toLocaleString('en-IN') : '0'}</td>
            </tr>
            <tr>
              <td class="label">Project Notes</td>
              <td class="value">${data.notes ? data.notes.replace(/\n/g, '<br>') : '-'}</td>
            </tr>
          </table>
    `;
  } else {
    // Contact
    html += `
            <tr>
              <td class="label">Service Required</td>
              <td class="value">${data.service || '-'}</td>
            </tr>
          </table>
          
          <div class="table-title">Message / Requirements</div>
          <table class="data-table">
            <tr>
              <td class="label" style="vertical-align: top;">Requirements</td>
              <td class="value">${data.message ? data.message.replace(/\n/g, '<br>') : '-'}</td>
            </tr>
          </table>
    `;
  }

  html += `
        </div>
        <div class="footer">
          This is an automated notification from SAARA Earthing Portal.
        </div>
      </div>
    </body>
    </html>
  `;

  // Plain-text alternative
  let text = `SAARA Earthing - New ${type.toUpperCase()} Submission\n`;
  text += `==============================================\n\n`;
  text += `Submission ID: ${id}\n`;
  text += `Name: ${data.name || '-'}\n`;
  text += `Email: ${data.email || '-'}\n`;
  text += `Phone: ${data.phone || '-'}\n`;
  text += `Company: ${data.company || '-'}\n`;

  if (type === 'quote') {
    text += `Location: ${data.location || '-'}\n\n`;
    text += `Grounding Design Spec:\n`;
    text += `--------------------\n`;
    text += `System Type: ${data.earthingSystemType || '-'}\n`;
    text += `Fault Current: ${data.faultCurrent ? `${data.faultCurrent} kA` : '-'}\n`;
    text += `Soil Resistivity: ${data.soilResistivity ? `${data.soilResistivity} Ω·m` : '-'}\n\n`;
    text += `Hardware & Volume:\n`;
    text += `-----------------\n`;
    text += `Electrode Size: ${data.electrodeDiameter || '-'} / ${data.electrodeLength || '-'}\n`;
    text += `Electrode Qty: ${data.electrodeQty || '-'} units\n`;
    text += `Compound Qty: ${data.compoundQty || '-'} bags\n`;
    text += `Pit Chamber: ${data.inspectionChamber || '-'}\n`;
    text += `Clamps Needed: ${data.clampsNeeded ? 'Yes' : 'No'}\n\n`;
    text += `Lightning Arrester:\n`;
    text += `------------------\n`;
    text += `Model: ${data.arresterType || '-'}\n`;
    text += `Qty: ${data.arresterQty || '0'} units\n\n`;
    text += `Additional Info:\n`;
    text += `----------------\n`;
    text += `Estimated Price: ₹${data.estimatedPrice ? data.estimatedPrice.toLocaleString('en-IN') : '0'}\n`;
    text += `Notes: ${data.notes || '-'}\n`;
  } else {
    text += `Service Required: ${data.service || '-'}\n\n`;
    text += `Message/Requirements:\n`;
    text += `---------------------\n`;
    text += `${data.message || '-'}\n`;
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    console.log(`[Mailer] Email sent successfully for submission ${id}: ${info.messageId}`);
  } catch (error: any) {
    console.error(`[Mailer Error] Failed to send email for submission ${id}:`, error);
  }
}
