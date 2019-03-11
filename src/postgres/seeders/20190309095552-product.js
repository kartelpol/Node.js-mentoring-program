'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', [{
            name: 'car',
        }], {});
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {})
};
