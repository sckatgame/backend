require('dotenv').config();
const nodemailer = require('nodemailer');
const configMail = require('../configs/configMail');

module.exports = async function SendMail(to,code){
    const transport = nodemailer.createTransport(configMail);

    await transport.sendMail({
        text:`Seu código de verificação: ${code}`,
        subject:'Código de Verificação',
        from:`Sckat Game <${process.env.SMTP_USER}>`,
        to:to
    })
}