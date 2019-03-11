'use strict';
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        source: DataTypes.STRING,
        views: DataTypes.INTEGER
    }, {});
    Review.associate = function (models) {
        Review.belongsTo(models.Product, {as: 'productId'});
    };
    return Review;
};
