require('dotenv').config();
const nodemailer = require('nodemailer');
const configMail = require('../configs/configMail');

module.exports = async function SendMail(to,code,message,subject){
    const transport = nodemailer.createTransport(configMail);

    await transport.sendMail({
        text:`${message}: ${code}`,
        subject,
        from:`Sckat Game <${process.env.SMTP_USER}>`,
        to:to
    })
}