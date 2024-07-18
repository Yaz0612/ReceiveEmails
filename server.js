// Ejecutar node server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

app.post('/send', async (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: process.env.USER_EMAIL,
        replyTo: email,
        subject: 'Mensaje de contacto',
        text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo enviado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

