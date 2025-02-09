import User_service from "../services/User_service";
import db from "../models";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing inputs parameter'
        })
    }

    let userData = await User_service.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //All , id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            users: []
        })
    }
    let users = await User_service.getAllUsers(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users
    })

}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}