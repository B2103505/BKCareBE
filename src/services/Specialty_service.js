import db from "../models";

let CreateNewSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imgBase64 ||
                !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imgBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create specialty succeed !!!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    CreateNewSpecialtyService, getAllSpecialtyService
}