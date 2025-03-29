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
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASS,
            },
            debug: true,
            logger: true,
        });

        await transport.verify();

        try {

            const toSend = await transport.sendMail({
                from: 'Vanilo Ferreira <vs.ferreira03@gmail.com>',
                to: email,
                subject: 'Confirmação de Recebimento (Vanilo Ferreira)',
                html: `
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px;">
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 500px; margin: auto;">
                        <h1 style="color: #333;">Obrigado pelo seu contato!</h1>
                        <p style="color: #666;">Prezado(a) ${name}, recebi sua mensagem através do meu portfólio profissional e em breve retornarei com uma resposta.</p>
                        <p style="color: #666;">Se precisar de algo urgente, sinta-se à vontade para me contatar diretamente.</p>
                        <div style="margin-top: 20px; font-size: 14px; color: #999;">Atenciosamente,<br>Vanilo Ferreira</div>
                    </div>
                </body>
                `,
            });

            if (toSend) {
                await transport.sendMail({
                    from: 'Vanilo Ferreira <vs.ferreira03@gmail.com>',
                    to: 'vs.ferreira03@gmail.com',
                    subject: `${subject} - Mensagem do Portfólio`,
                    html: `
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px;">
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 500px; margin: auto; text-align: left;">
                        <h1 style="color: #333; text-align: center;">Nova Mensagem Recebida</h1>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>E-mail:</strong> ${email}</p>
                        <p><strong>Assunto:</strong> ${subject}</p>
                        <p><strong>Mensagem:</strong></p>
                        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
                        <div style="margin-top: 20px; font-size: 14px; color: #999; text-align: center;">Mensagem enviada através do Portfólio.</div>
                    </div>
                </body>
                `,
                });
            }

            return res.status(200).json({ message: 'Emails enviados com sucesso!' });

        } catch (emailError) {
            console.error('Erro ao enviar o e-mail:', emailError);

            if (emailError.response && emailError.response.includes('550')) {
                return res.status(400).json({ error: 'O endereço de e-mail fornecido não é válido ou não existe.' });
            }

            return res.status(500).json({ error: 'Erro ao enviar o e-mail. Tente novamente mais tarde.' });
        }

    } catch (error) {
        console.error('Erro na conexão SMTP:', error);
        return res.status(500).json({ error: 'Erro ao conectar ao servidor SMTP.' });
    }
};

module.exports = {
    contacteMe,
};