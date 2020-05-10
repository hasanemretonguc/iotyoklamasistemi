const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.email}`,
        pass: `${process.env.password}`
    }
});

async function sendMail(userEmail, context) {
    let mailOptions = {
        from: process.env.email,
        to: userEmail,
        subject: 'Şifre sıfırlamak istedin geldim',
        text: process.env.resetpasswordHost + context
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
    });
}

module.exports = sendMail;