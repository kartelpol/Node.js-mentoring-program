'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const productsId = queryInterface.rawSelect('Product', {}, [id]);

        return queryInterface.bulkInsert('Reviews', [{
            source: 'online store',
            productId: productsId[0],
        }], {});
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews', null, {})
};
