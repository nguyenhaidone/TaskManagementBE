import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { env } from '*/config/environment'

const transporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  service: env.SERVICE_NAME,
  auth: {
    user: env.EMAIL,
    pass: env.PASSWORD
  }
})

transporter.use(
  'compile',
  hbs({
    viewEngine: 'express-handlebars',
    viewPath: './src/views'
  })
)

const mailOptions = (email, typeEmail) => {
  const option = {
    from: 'davinci682000@gmail.com',
    to: email,
    html: typeEmail.html,
    subject: typeEmail.subject
  }
  return option
}

export const transport = { transporter, mailOptions }
