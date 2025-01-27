
import db from '../models/index';
import Crud_service from '../services/Crud_service';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('HomePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }


}

let getAbout = (req, res) => {
    return res.render('test/about.ejs');
}

let getCrud = (req, res) => {
    return res.render('crud.ejs');
}

let postCrud = async (req, res) => {
    let message = await Crud_service.createNewUser(req.body);
    console.log(message);
    // console.log(req.body);
    return res.send('post crud from server');
}

let displayGetCrud = async (req, res) => {
    let data = await Crud_service.getAllUser();
    return res.render('displayCRUD.ejs', {
        DataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await Crud_service.getUserInfoById(userId);
        //check user data not found

        return res.render('editCRUD.ejs', {
            userInfo: userData
        });
    } else {
        return res.send('User not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await Crud_service.updateUserData(data);
    console.log(data);
    res.redirect('/get-crud');
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await Crud_service.deleteUserbyId(id);
        return res.send('delete user succeed');
    } else {
        return res.send('User not found!!!');
    }

}

// Object : {
//     key: '',
//     value: '';
// }

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCrud: getCrud,
    postCrud: postCrud,
    displayGetCrud: displayGetCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
