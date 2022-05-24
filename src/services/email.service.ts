import path from "path";

import nodemailer, { Transporter } from "nodemailer";
import Email from "email-templates";

import { serverConfig } from "config";

class MailTransporter {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(serverConfig.email.server);
  }

  sendEmail(to: string, subject: string, templateName: string, data: unknown) {
    const _this = this;
    return new Promise((resolve, reject) => {
      const email = new Email({
        views: {
          options: {
            extension: "ejs",
          },
        },
      });
      const emailDir = path.resolve(__dirname, "../../../templates/email", `${templateName}`);
      email.render(path.join(emailDir), { data }).then(html => {
        const mailOptions = {
          from: serverConfig.email.from_email,
          to,
          subject,
          text: html,
          html: html,
        };
        _this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    });
  }
}

const EmailService = new MailTransporter();

export default EmailService;
