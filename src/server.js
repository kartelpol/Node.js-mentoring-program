import * as express from 'express';
import passport from 'passport';
import setupPassport from './middlewares/passport';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import routers from './routers';

export default function configureServer(postgres = [], mongo = []) {
    const SECRET_CODE = 'secret';
    const app = express();

    app.use(cookieParser);
    app.use(queryParser);
    app.use(express.json());

    app.use((req, res, next) => {
        req.context = {
            models: {
                postgres,
                mongo,
            },
            DEFAULT_DB: 'mongo'
        };
        next();
    });

    app.use(require('express-session')({
        resave: false,
        saveUninitialized: false,
        secret: 'secret'
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    setupPassport(mongo.User);

    app.use(routers.initializeAuthRouter(SECRET_CODE));
    app.use(routers.initializeAPIRouter(SECRET_CODE));

    return app;
}
