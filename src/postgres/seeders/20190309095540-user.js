'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Users', [{
            name: 'admin',
            password: 'admin',
        }], {});
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
