
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

let displayGetCrud = async (req,res) => {
    let data = await Crud_service.getAllUser();
    console.log('----------------');
    console.log(data);
    console.log('----------------');

    return res.render('displayCRUD.ejs',{
        DataTable: data
    });
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
    
}
