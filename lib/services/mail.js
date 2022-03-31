'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    async getTransporter() {
        const testAccount = await nodemailer.createTestAccount();

        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    async sendEmail(email, emailSubject, text) {
        const transporter = await this.getTransporter();

        const info = await transporter.sendMail({
            from: '"Flouflix" <foo@example.com>',
            to: email,
            subject: emailSubject,
            text: 'hello !',
            html: text
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

};
