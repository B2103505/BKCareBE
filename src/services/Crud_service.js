import bcrypt from 'bcryptjs';
import db from '../models/index';
import { resolveInclude } from 'ejs';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcryptjs = await hashUserpass(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcryptjs,
                firstName: data.Fname,
                lastName: data.Lname,
                phoneNumber: data.phoneNum,
                address: data.inputAddress,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('Done');

        } catch (e) {
            console.log(e);
        }
    })


}

let hashUserpass = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.Fname;
                user.lastName = data.Lname;
                user.address = data.Address;

                await user.save();
                console.log(user);
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData
}