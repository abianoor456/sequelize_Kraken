'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('userroles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        onDelete:'CASCADE'
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('userroles');
  }
};