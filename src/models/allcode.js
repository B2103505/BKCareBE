"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: "positionId", as: "positionData" });
      Allcode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });

      //map to Schedule
      Allcode.hasMany(models.Schedule, { foreignKey: "timeType", as: "timeTypeData" });

      //Map to Doctor_Info
      Allcode.hasMany(models.Doctor_Info, { foreignKey: "priceId", as: "PriceTypeData" });
      Allcode.hasMany(models.Doctor_Info, { foreignKey: "paymentId", as: "PaymentTypeData" });
      Allcode.hasMany(models.Doctor_Info, { foreignKey: "provinceId", as: "ProvinceTypeData" });

      Allcode.hasMany(models.Booking, { foreignKey: "timeType", as: "timeTypeDataPatient" });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
