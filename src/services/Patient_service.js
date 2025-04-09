import { where } from "sequelize";
import db from "../models";
require('dotenv').config();
import EmailService from './EmailService'


let PostBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                await EmailService.sendSimpleEmail({
                    receiver: data.email,
                    fullName: 'patient Name',
                    time:  '8:00 - 9:00 thứ năm 10/4/2025',
                    doctorName: 'Penaldo',
                    redirectLink: 'https://www.youtube.com/'
                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                //create
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save Infor Patient Succeed !!!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    PostBookAppointmentService,
}