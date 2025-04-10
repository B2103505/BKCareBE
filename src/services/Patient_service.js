import { where } from "sequelize";
import db from "../models";
require("dotenv").config();
import EmailService from "./EmailService";
import { v4 as uuidv4 } from "uuid";

let BuildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify?token=${token}&doctorId=${doctorId}`;

  return result;
};

let PostBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        await EmailService.sendSimpleEmail({
          receiver: data.email,
          fullName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: BuildUrlEmail(data.doctorId, token),
        });

        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            phoneNumber: data.phoneNumber,
            gender: data.selectedGender,
            firstName: data.fullName,
            address: data.address,
          },
        });

        //create
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save Infor Patient Succeed !!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let PostVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            token: data.token,
            doctorId: data.doctorId,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();

          resolve({
            errCode: 0,
            errMessage: "update appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been actived or does not exit !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  PostBookAppointmentService,
  PostVerifyBookAppointmentService,
};
