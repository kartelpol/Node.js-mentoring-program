import * as express from 'express';
import passport from 'passport';
import setupPassport from './middlewares/passport';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import routers from './routers';

export default function configureServer(models) {
    const SECRET_CODE = 'secret';
    const app = express();

    app.use(cookieParser);
    app.use(queryParser);
    app.use(express.json());

    app.use(require('express-session')({
        resave: false,
        saveUninitialized: false,
        secret: 'secret'
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    setupPassport(models.User);

    app.use((req, res, next) => {
        req.context = {
            models,
        };
        next();
    });

    app.use(routers.initializeAuthRouter(SECRET_CODE));
    app.use(routers.initializeAPIRouter(SECRET_CODE));

    return app;
}
