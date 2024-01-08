// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Category.init({
//     id: DataTypes.UUID,
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Category',
//   });
//   return Category;
// };

// models/category.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updated: {
                type: DataTypes.DATE,
                allowNull: true
            },
            deleted: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: "Category",
            createdAt: "created",
            updatedAt: "updated",
            deletedAt: "deleted",
            paranoid: true,
            freezeTableName: true,
            timestamps: true,
        }
    ); 

    return Category;
};
