const nodemailer = require('nodemailer');

function sendEmail(userInfo) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adm.bestplan@gmail.com',
            pass: '@dm.b3stpl@n',
        },
    });

    const mailOptions = {
        from: 'adm.bestplan@gmail.com',
        to: userInfo.toEmail,
        subject: 'Welcome to BestPlan.',
        text: userInfo.text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default {
    sendEmail,
};

