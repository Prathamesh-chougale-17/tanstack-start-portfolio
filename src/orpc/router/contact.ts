import nodemailer from 'nodemailer'
import { os } from '@orpc/server'
import { z } from 'zod'
import { env } from '@/env'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' }),
})

export const submitContact = os
  .input(contactSchema)
  .handler(async ({ input }) => {
    const { name, email, subject, message } = input

    try {
      // Create email transporter (use typed env)
      const transporter = nodemailer.createTransport({
        host: env.EMAIL_SERVER_HOST,
        port: Number(env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      })

      // Prepare email content
      const mailOptions = {
        from: env.EMAIL_SERVER_USER,
        to: env.EMAIL_ADMIN,
        subject: `Contact Form: ${subject}`,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Prathamesh Chougale Contact Response</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                .email-container {
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  border-top: 5px solid #4a6cf7;
                }
                .header {
                  background-color: #4a6cf7;
                  padding: 20px;
                  text-align: center;
                }
                .header h1 {
                  color: white;
                  margin: 0;
                  font-size: 24px;
                  letter-spacing: 1px;
                }
                .content {
                  padding: 30px;
                  background-color: #ffffff;
                }
                .contact-info {
                  background-color: #f5f8ff;
                  border-radius: 6px;
                  padding: 20px;
                  margin-bottom: 20px;
                }
                .message-box {
                  background-color: #f5f8ff;
                  border-left: 4px solid #4a6cf7;
                  padding: 15px;
                  margin-top: 20px;
                  border-radius: 0 4px 4px 0;
                }
                .footer {
                  background-color: #f5f5f5;
                  padding: 15px;
                  text-align: center;
                  font-size: 14px;
                  color: #666;
                }
                .label {
                  font-weight: 600;
                  color: #555;
                  margin-right: 5px;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <h1>Portfolio Contact</h1>
                </div>
                <div class="content">
                  <h2 style="color: #4a6cf7; margin-top: 0; font-weight: 600;">New Message Received</h2>
                  <p>You have received a new message from your portfolio contact form:</p>

                  <div class="contact-info">
                    <p><span class="label">Name:</span> ${name}</p>
                    <p><span class="label">Email:</span> ${email}</p>
                    <p><span class="label">Subject:</span> ${subject}</p>
                  </div>

                  <div class="message-box">
                    <p><span class="label">Message:</span></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>

                  <p style="margin-top: 25px;">Reply to this email to respond directly to the sender.</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Portfolio Contact Form</p>
                  <p style="margin-top: 15px; font-size: 12px;">This is an automated message from your portfolio contact form.</p>
                </div>
              </div>
            </body>
            </html>
          `,
      }

      // Send thank you email
      const thankYouMailOptions = {
        from: env.EMAIL_SERVER_USER,
        to: email,
        subject: 'Thank you for reaching out!',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank You for Reaching Out</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                .email-container {
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  border-top: 5px solid #4a6cf7;
                }
                .header {
                  background-color: #4a6cf7;
                  padding: 20px;
                  text-align: center;
                }
                .header h1 {
                  color: white;
                  margin: 0;
                  font-size: 24px;
                  letter-spacing: 1px;
                }
                .content {
                  padding: 30px;
                  background-color: #ffffff;
                }
                .message-box {
                  background-color: #f5f8ff;
                  border-left: 4px solid #4a6cf7;
                  padding: 15px;
                  margin-top: 20px;
                  border-radius: 0 4px 4px 0;
                }
                .footer {
                  background-color: #f5f5f5;
                  padding: 15px;
                  text-align: center;
                  font-size: 14px;
                  color: #666;
                }
                .label {
                  font-weight: 600;
                  color: #555;
                  margin-right: 5px;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <h1>Thank You for Reaching Out</h1>
                </div>
                <div class="content">
                  <h2 style="color: #4a6cf7; margin-top: 0; font-weight: 600;">Hi ${name.split(' ')[0]},</h2>
                  <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>

                  <div class="message-box">
                    <p><span class="label">Your Message:</span></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>

                  <p style="margin-top: 25px;">I'll respond within 24-48 hours. Looking forward to connecting with you!</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Portfolio</p>
                  <p style="margin-top: 15px; font-size: 12px;">This is an automated confirmation of your contact form submission.</p>
                </div>
              </div>
            </body>
            </html>
          `,
      }

      // Send emails
      await transporter.sendMail(mailOptions)
      await transporter.sendMail(thankYouMailOptions)

      return {
        success: true,
        message: 'Your message has been sent successfully!',
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      throw new Error('Failed to send your message. Please try again later.')
    }
  })
