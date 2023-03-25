import { google } from "googleapis";
import nodemailer from "nodemailer";

const createUniqueString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i += 1) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADRESS,
} = process.env;
const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND,
);
//send email

export const sendEmail = (email, uniqueString, subject, template) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: SENDER_EMAIL_ADRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken,
        },
    });
    const  url =`${process.env.BASE_URL}/api/verify/${uniqueString}`
    const mailOptions = {
        from: SENDER_EMAIL_ADRESS,
        to: email,
        subject: subject,
        html: template(email,url),
    };
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("errorOnSendEmail",error);
            return error;
        } else {
            return info;
        };
    });
};
const emailService = {
  createUniqueString,
  sendEmail,
};

export default emailService;