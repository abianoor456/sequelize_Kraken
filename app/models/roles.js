'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

class Roles extends Model {
  
  static associate(models) {
    Roles.belongsToMany(models.Users,{ through: models.Userroles, onDelete: 'CASCADE' });
  }
};

Roles.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
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
    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
  },
  modelName: 'roles',
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  sequelize: global.sequelize
});

module.exports = Roles;