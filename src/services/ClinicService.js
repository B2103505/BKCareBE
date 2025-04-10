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
  return new promise(async (resolve, reject) => {
    try {
      if (!inputID) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.FindOne({
          where: {
            id: inputID,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });

        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputID },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else data = {};
      }

      resolve({
        errMessage: "ok",
        errCode: 0,
        data,
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
