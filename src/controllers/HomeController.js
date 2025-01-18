
let getHomePage = (req, res) => {
    return res.render('HomePage.ejs');
}

let getAbout = (req, res) => {
    return res.render('test/about.ejs');
}


// Object : {
//     key: '',
//     value: '';
// }

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
}
