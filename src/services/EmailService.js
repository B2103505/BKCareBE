require('dotenv').config();
const nodemailer = require("nodemailer");


let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"BKCare system" <demonienluan2025@gmail.com>', // sender address
        to: dataSend.receiver,
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body
        html: `
            <h2>Xin chào ${dataSend.fullName}! </h2>
            <p>Bạn nhận được email này để xác nhận đã đặt lịch khám bệnh thành công</p>
            <h4> Thông tin đặt lịch khám bệnh </h4>
            <div> Thời gian: ${dataSend.time} </div>
            <div> Bác sĩ: ${dataSend.doctorName} </div>
            <p>Nếu thông tin chính xác vui lòng xác nhận qua link bên dưới để xác nhận</p>
            <div> <a href=${dataSend.redirectLink} target="_blank">Click here</a> </div>
        `, // html body
    });
}


async function main() {

}

main().catch(console.error);

module.exports = {
    sendSimpleEmail
}