import nodemailer from 'nodemailer';
export const sendReceiptEmail = async (customerEmail, receiptHtml) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use your SMTP provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: '"Royal Gibs Boutique" <receipts@royalgibs.com>',
        to: customerEmail,
        subject: 'Your Receipt from Royal Gibs Boutique',
        html: receiptHtml,
    });
};
