'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            source: {
                type: Sequelize.STRING
            },
            views: {
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER,
                onDelete: "Cascade",
                foreignKey: true,
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Reviews');
    }
};
