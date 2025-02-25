import nodemailer from 'nodemailer'
import fs from 'fs/promises'
import path from 'path'
export default async function sendEmail(
    { url, email }:
        { url: string, email: string }
) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "areadetecnologiahidrofalcon@gmail.com",
            pass: "ygdt tuxn rdfv ummi",
        },
    });
    const indexFile = path.resolve('./server/utils/SendEmail/sendEmail.html')
    const getHtml = await fs.readFile(indexFile, { encoding: 'utf8' })
    const html = getHtml.replace('href="#"', `href="${url}"`).replace('src="./Logo_Hidrofalcon.png"', 'src="cid:logo"')
    try {
        await transporter.sendMail({
            from: "areadetecnologiahidrofalcon@gmail.com",
            to: email,
            subject: 'Cambio de Contraseña',
            html: html,
            attachments: [{
                filename: 'logo.png',
                path: path.resolve('./server/utils/SendEmail/Logo_Hidrofalcon.png'),
                cid: 'logo'
            }]
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }

}