import bcrypt from 'bcryptjs';
import db from '../models/index';

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

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,

}