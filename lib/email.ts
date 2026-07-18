import nodemailer from 'nodemailer'
import { logger } from './logger'

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

let transporterInstance: any = null

function getEmailTransporter() {
  if (!transporterInstance) {
    transporterInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }
  return transporterInstance
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      logger.warn('Email credentials missing. Skipping email send.')
      return false
    }

    const transporter = getEmailTransporter()
    await transporter.sendMail({
      from: options.from || `"YESJ" <${process.env.GMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    logger.info('Email sent', {
      to: options.to,
      subject: options.subject,
    })

    return true
  } catch (error) {
    logger.error('Failed to send email', {
      to: options.to,
      subject: options.subject,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, error as Error)
    
    return false
  }
}

export function getInvoiceEmail(data: {
  studentName: string
  courseTitle: string
  amount: number
  orderId: string
  paymentId: string
  date: string
  paymentMode: string
}): string {
  const isAdvance = data.paymentMode === "advance"
  const totalLabel = isAdvance ? "Advance Payment" : "Full Payment"
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #C05C00 0%, #8B4200 100%); color: white; padding: 40px 20px; text-align: center; }
          .invoice-card { padding: 30px; }
          .status-badge { display: inline-block; padding: 6px 12px; background: #ecfdf5; color: #059669; border-radius: 99px; font-size: 12px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; }
          .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .details-table td { padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; }
          .details-table td:last-child { text-align: right; font-weight: 600; }
          .total-row { background: #fafafa; padding: 20px; border-radius: 8px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
          .total-amount { font-size: 24px; font-weight: 800; color: #C05C00; }
          .footer { background: #1a1a1a; color: #888; padding: 30px; text-align: center; font-size: 12px; }
          .button { display: inline-block; padding: 14px 28px; background: #C05C00; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 25px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 28px;">Payment Receipt</h1>
            <p style="margin:10px 0 0; opacity: 0.8;">Hot Summer Cool Courses 2026</p>
          </div>
          
          <div class="invoice-card">
            <div class="status-badge">Payment Confirmed</div>
            <h2 style="margin:0 0 10px;">Hello, ${data.studentName}!</h2>
            <p style="color: #666; margin-top: 0;">We've successfully received your registration fee for the summer course.</p>
            
            <table class="details-table">
              <tr>
                <td style="color: #666;">Course</td>
                <td>${data.courseTitle}</td>
              </tr>
              <tr>
                <td style="color: #666;">Order ID</td>
                <td>${data.orderId}</td>
              </tr>
              <tr>
                <td style="color: #666;">Payment ID</td>
                <td>${data.paymentId}</td>
              </tr>
              <tr>
                <td style="color: #666;">Date</td>
                <td>${data.date}</td>
              </tr>
              <tr>
                <td style="color: #666;">Payment Type</td>
                <td>${totalLabel}</td>
              </tr>
            </table>
            
            <div class="total-row">
              <span style="font-weight: bold; color: #666;">Amount Paid</span>
              <span class="total-amount">₹${data.amount}</span>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Please keep this receipt for your records. Our team will reach out to you with the batch orientation details 3 days before the course starts.
            </p>
            
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
              <p style="text-align: center; font-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-20">Our Partners & Collaborators</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="width: 33.33%; padding: 10px; text-align: center;">
                    <img src="https://storage.googleapis.com/yesj/assets/COLLABORATORS/Coramandel%20International.png" alt="Coromandel" style="max-height: 40px; max-width: 100%; filter: grayscale(100%);">
                  </td>
                  <td style="width: 33.33%; padding: 10px; text-align: center;">
                    <img src="https://storage.googleapis.com/yesj/assets/COLLABORATORS/Deichman%20Foundation.png" alt="Deichman" style="max-height: 40px; max-width: 100%; filter: grayscale(100%);">
                  </td>
                  <td style="width: 33.33%; padding: 10px; text-align: center;">
                    <img src="https://storage.googleapis.com/yesj/assets/COLLABORATORS/Friendly%20Hands,%20London.png" alt="Friendly Hands" style="max-height: 40px; max-width: 100%; filter: grayscale(100%);">
                  </td>
                </tr>
                <tr>
                  <td style="width: 33.33%; padding: 10px; text-align: center;">
                    <img src="https://storage.googleapis.com/yesj/assets/COLLABORATORS/KIMS%20Hospitals,%20Hyderabad.png" alt="KIMS" style="max-height: 40px; max-width: 100%; filter: grayscale(100%);">
                  </td>
                  <td style="width: 33.33%; padding: 10px; text-align: center;">
                    <img src="https://storage.googleapis.com/yesj/assets/COLLABORATORS/LINSI%20Foundation.jpg" alt="LINSI" style="max-height: 40px; max-width: 100%; filter: grayscale(100%);">
                  </td>
                  <td style="width: 33.33%; padding: 10px; text-align: center;">
                    <img src="https://storage.googleapis.com/yesj/assets/COLLABORATORS/NorthSouth%20LOGO.png" alt="NorthSouth" style="max-height: 40px; max-width: 100%; filter: grayscale(100%);">
                  </td>
                </tr>
              </table>
            </div>


          </div>
          
          <div class="footer">
            <p style="margin:0 0 10px; color: white;">Youth Empowering Service - Jesuits (YESJ)</p>
            <p>Andhra Loyola College Campus, Vijayawada, AP - 522 008</p>
            <p style="margin-top: 20px;">&copy; 2026 YESJ. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getRegistrationConfirmationEmail(data: {
  name: string
  applicationType: string
  registrationId: string
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yesj.org'
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #7f1d1d; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background-color: #7f1d1d; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>YESJ Registration Confirmation</h1>
          </div>
          <div class="content">
            <h2>Dear ${data.name},</h2>
            <p>Thank you for registering with YESJ! We're excited to have you join our movement.</p>
            
            <p><strong>Registration Details:</strong></p>
            <ul>
              <li>Registration ID: <strong>${data.registrationId}</strong></li>
              <li>Application Type: <strong>${data.applicationType === 'membership' ? 'Membership' : 'Leadership'}</strong></li>
              <li>Status: <strong>Pending Review</strong></li>
            </ul>

            <p>Your application is currently under review. Our team will get back to you within 3-5 business days.</p>

            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Explore our programs</li>
              <li>Learn more about our initiatives</li>
              <li>Connect with us on social media</li>
            </ul>

            <a href="${siteUrl}/programs" class="button">Explore Programs</a>

            <p>If you have any questions, please don't hesitate to contact us at info@yesj.org</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} YESJ. All rights reserved.</p>
            <p>Empowering youth through service and leadership.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getNewsletterWelcomeEmail(email: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #7f1d1d; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to YESJ Newsletter!</h1>
          </div>
          <div class="content">
            <h2>Thank you for subscribing!</h2>
            <p>You've successfully subscribed to the YESJ newsletter.</p>
            
            <p>You'll now receive:</p>
            <ul>
              <li>Transformation stories</li>
              <li>Program updates</li>
              <li>Volunteer opportunities</li>
              <li>Ways to get involved</li>
            </ul>

            <p>Stay connected with us and be part of our mission to empower 50,000+ youth across Telugu states!</p>
          </div>
          <div class="footer">
            <p>You can unsubscribe at any time by clicking <a href="https://yesj.in/unsubscribe?email=${email}">here</a>.</p>
            <p>&copy; ${new Date().getFullYear()} YESJ. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
