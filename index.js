import configureServer from 'src/server';
import db from 'src/postgres/models';

const port = process.env.PORT || 8080;
const app = configureServer(db.models);

db.sequelize
    .sync()
    .then(() => {
        app.listen(port, () => console.log(`App listenings on port ${port}!`));
    }); 
