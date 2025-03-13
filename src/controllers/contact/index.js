const nodemailer = require('nodemailer');
require('dotenv').config();

const contacteMe = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {

        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.AUTH_USER_GMAIL,
                pass: process.env.AUTH_PASS_GMAIL,
            }
        });

        const enviar = transport.sendMail({
            from: 'Vanilo Ferreira <vanilo.ferreira03@gmail.com>',
            to: `${email}`,
            subject: subject,
            html: `<h1>${name}<h1> <p>${message}</p>`,
            text: message
        }).catch((err) => console.log('Erro ao enviar o email: ', err)); 

        if(enviar) {
            transport.sendMail({
                from: 'Vanilo Ferreira <vanilo.ferreira03@gmail.com>',
                to: `vanilo.ferreira03@gmail.com`,
                subject: 'E-mail do Portfolio',
                html: `<h1>${name}<h1> <p>${message}</p>`,
                text: message
            }).catch((err) => console.log('Erro ao enviar o email: ', err)); 
        }

        return res.status(200).json('Email sents successfully!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    contacteMe,
}