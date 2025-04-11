require("dotenv").config();
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
    html: getBodyHTML(dataSend), // html body
  });
};

let sendAttachmentEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"BKCare system" <demonienluan2025@gmail.com>',
    to: dataSend.email,
    subject: "Đơn thuốc từ hệ thống BKCare",
    html: getRemedyBodyHTML(dataSend),
    attachments: [
      {
        filename: "remedy.jpg",
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
        contentType: "image/jpeg",
      },
    ],
  });
};

let getBodyHTML = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
            <h2>Xin chào ${dataSend.fullName}! </h2>
            <p>Bạn nhận được email này để xác nhận đã đặt lịch khám bệnh thành công</p>
            <h4> Thông tin đặt lịch khám bệnh </h4>
            <div> Thời gian: ${dataSend.time} </div>
            <div> Bác sĩ: ${dataSend.doctorName} </div>
            <p>Nếu thông tin chính xác vui lòng xác nhận qua link bên dưới để xác nhận</p>
            <div> <a href=${dataSend.redirectLink} target="_blank">Click here</a> </div>
        `;
  }

  if (dataSend.language === "en") {
    result = `
            <h2>Dear ${dataSend.fullName}! </h2>
            <p>You received this email because you booked a medical appointment success!</p>
            <h4> Information Schedule an appointment </h4>
            <div> Time: ${dataSend.time} </div>
            <div> Doctor: ${dataSend.doctorName} </div>
            <p>If the above information is correct, plz click on the link below to confirm</p>
            <div> <a href=${dataSend.redirectLink} target="_blank">Click here</a> </div>
            <div> Sincerely, thank </div>
        `;
  }
  return result;
};

let getRemedyBodyHTML = (dataSend) => {
  let result = "";

  if (dataSend.language === "vi") {
    result = `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã khám bệnh thành công tại BKCare.</p>
      <p>Thông tin đơn thuốc:</p>
      <div><b>Bác sĩ:</b> ${dataSend.doctorName}</div>
      <div><b>Thời gian khám:</b> ${dataSend.time}</div>
      <div><b>Ghi chú:</b> ${dataSend.note || "Không có ghi chú."}</div>
      <p>Vui lòng xem chi tiết đơn thuốc trong file đính kèm.</p>
      <p>Xin cảm ơn!</p>
    `;
  }

  if (dataSend.language === "en") {
    result = `
      <h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because your medical appointment has been completed.</p>
      <p>Prescription info:</p>
      <div><b>Doctor:</b> ${dataSend.doctorName}</div>
      <div><b>Time:</b> ${dataSend.time}</div>
      <div><b>Note:</b> ${dataSend.note || "No notes provided."}</div>
      <p>Please check the attached file for your remedy.</p>
      <p>Thanks for using BKCare!</p>
    `;
  }

  return result;
};

async function main() {}

main().catch(console.error);

module.exports = {
  sendSimpleEmail,
  sendSimpleEmail,
  sendAttachmentEmail,
};
