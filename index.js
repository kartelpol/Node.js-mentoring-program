import configureServer from 'src/server';
import postgresDB from 'src/postgres/models';
import initialize from 'src/mongo/mongoose';

async function runServer() {
    const port = process.env.PORT || 8080;
    const mongoDb = {models: await initialize()};

    const app = configureServer(postgresDB.models, mongoDb.models);
    postgresDB.sequelize
        .sync()
        .then(() => {
            app.listen(port, () => console.log(`App listening on port ${port}!`));
        });
}

runServer();
