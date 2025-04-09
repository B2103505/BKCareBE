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
        html: getBodyHTML(dataSend)
        , // html body
    });
}

let getBodyHTML = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
            <h2>Xin chào ${dataSend.fullName}! </h2>
            <p>Bạn nhận được email này để xác nhận đã đặt lịch khám bệnh thành công</p>
            <h4> Thông tin đặt lịch khám bệnh </h4>
            <div> Thời gian: ${dataSend.time} </div>
            <div> Bác sĩ: ${dataSend.doctorName} </div>
            <p>Nếu thông tin chính xác vui lòng xác nhận qua link bên dưới để xác nhận</p>
            <div> <a href=${dataSend.redirectLink} target="_blank">Click here</a> </div>
        `
    }

    if (dataSend.language === 'en') {
        result = `
            <h2>Dear ${dataSend.fullName}! </h2>
            <p>You received this email because you booked a medical appointment success!</p>
            <h4> Information Schedule an appointment </h4>
            <div> Time: ${dataSend.time} </div>
            <div> Doctor: ${dataSend.doctorName} </div>
            <p>If the above information is correct, plz click on the link below to confirm</p>
            <div> <a href=${dataSend.redirectLink} target="_blank">Click here</a> </div>
            <div> Sincerely, thank </div>
        `
    }
    return result;
}


async function main() {

}

main().catch(console.error);

module.exports = {
    sendSimpleEmail
}