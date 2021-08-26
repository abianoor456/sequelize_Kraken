'use strict';
const {Sequelize, Model, DataTypes} = require('sequelize');

  class Userroles extends Model {
    
    static associate(models) {
      Userroles.belongsTo(models.Users);
      Userroles.belongsTo(models.Roles);
    }
  }
  
  Userroles.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      onDelete:'CASCADE',
      primaryKey: true,
    },
    roleId: {
      allowNull: false,
      field: 'role_id',
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        field: 'id'
      },
      onDelete:'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'user',
        field: 'id'
      },
      onDelete:'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    defaultScope: {
      attributes: { exclude: [ 'createdAt', 'updatedAt','deletedAt'] },
    },
    modelName: 'userroles',
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    sequelize: global.sequelize
  });
  
  module.exports = Userroles;

