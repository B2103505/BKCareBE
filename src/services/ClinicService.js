import db from "../models";

let CreateClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imgBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imgBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Create specialty succeed !!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetaiClinicById = (inputID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputID) {
        return resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      }

      let data = await db.Clinic.findOne({
        where: {
          id: inputID,
        },
        attributes: ["name", "address", "image", "descriptionHTML", "descriptionMarkdown"],
      });

      if (data) {
        let doctorClinic = await db.Doctor_Info.findAll({
          where: { doctorId: inputID },
          attributes: ["doctorId", "provinceId"],
        });

        data.doctorClinic = doctorClinic;
      }

      return resolve({
        errMessage: "ok",
        errCode: 0,
        data: data || {},
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  CreateClinic: CreateClinic,
  getAllClinic: getAllClinic,
  getDetaiClinicById: getDetaiClinicById,
};
