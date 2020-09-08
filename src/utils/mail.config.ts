import nodemailer from 'nodemailer';
import { DataMessage } from './DataMessage.interface';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
});

export const send = async (dataMessage: DataMessage) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    let info = await transporter.sendMail(dataMessage);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(error.message);
  }
};
