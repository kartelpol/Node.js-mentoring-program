const product = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
      name: DataTypes.STRING,
    });
  
    Product.associate = models => {
        Product.belongsTo(models.User, {as: 'user'});
    };
  
    return Product;
  };

export default product;
