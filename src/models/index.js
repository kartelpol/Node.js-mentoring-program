import Sequelize from 'sequelize';
import createUser from './User'; 
import createProduct from './Product'; 

const DATABASE = 'MarketDB';
const DATABASE_USER = 'postgres';
const DATABASE_PASSWORD = 'postgres';

const sequelize = new Sequelize(
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    dialect: 'postgres'
  },
);

const models = {
  User: createUser(sequelize, Sequelize),
  Product: createProduct(sequelize, Sequelize),
}

Object.keys(models).forEach(key => 'associate' in models[key] && models[key].associate(models));

async function fillDB (models) {
    await models.User.create(
        {
            username: 'Admin',
            password: 'admin'
        }
    );
    
    await models.User.create(
        {
            username: 'Apple',
            products: [
                { name: 'phone' },
                { name: 'laptop' },
            ],
        }, { include: [models.Product]},
    );
    
    await models.User.create(
      {
          username: 'Chevrolet',
          products: [
              { name: 'car' },
          ],
      }, { include: [models.Product]},
    );
}

export { sequelize, fillDB };

export default models;

