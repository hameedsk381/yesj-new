import { logger } from './logger'

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: options.from || 'APTSAICUF <noreply@aptsaicuf.org>',
    //   to: options.to,
    //   subject: options.subject,
    //   html: options.html,
    // })

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

export function getRegistrationConfirmationEmail(data: {
  name: string
  applicationType: string
  registrationId: string
}): string {
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
            <h1>APTSAICUF Registration Confirmation</h1>
          </div>
          <div class="content">
            <h2>Dear ${data.name},</h2>
            <p>Thank you for registering with APTSAICUF! We're excited to have you join our community.</p>
            
            <p><strong>Registration Details:</strong></p>
            <ul>
              <li>Registration ID: <strong>${data.registrationId}</strong></li>
              <li>Application Type: <strong>${data.applicationType === 'membership' ? 'Membership' : 'Leadership'}</strong></li>
              <li>Status: <strong>Pending Review</strong></li>
            </ul>

            <p>Your application is currently under review. Our team will get back to you within 3-5 business days.</p>

            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Explore our upcoming events</li>
              <li>Learn more about our programs and initiatives</li>
              <li>Connect with us on social media</li>
            </ul>

            <a href="https://aptsaicuf.org/events" class="button">View Upcoming Events</a>

            <p>If you have any questions, please don't hesitate to contact us at info@aptsaicuf.org</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} APTSAICUF. All rights reserved.</p>
            <p>Empowering students through faith, justice, and leadership since 1924.</p>
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
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to APTSAICUF Newsletter!</h1>
          </div>
          <div class="content">
            <h2>Thank you for subscribing!</h2>
            <p>You've successfully subscribed to the APTSAICUF newsletter.</p>
            
            <p>You'll now receive:</p>
            <ul>
              <li>Updates on upcoming events and activities</li>
              <li>Leadership training opportunities</li>
              <li>Success stories from our community</li>
              <li>Important announcements</li>
            </ul>

            <p>Stay connected with us and be part of our mission to empower students across Andhra Pradesh and Telangana!</p>
          </div>
          <div class="footer">
            <p>You can unsubscribe at any time by clicking <a href="https://aptsaicuf.org/unsubscribe?email=${email}">here</a>.</p>
            <p>&copy; ${new Date().getFullYear()} APTSAICUF. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
