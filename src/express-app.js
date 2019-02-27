import * as express from 'express';
import passport from 'passport';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import setupPassport from './middlewares/passport';
import routers from './routers';

const app = configureExpress();

function configureExpress() {
    const SECRET_CODE = 'secret';
    const credentials = {
        admin: {
            password: 'adminpass',
        }
    }

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
    
    setupPassport(credentials);
    app.use(routers.initializeAuthRouter(SECRET_CODE, credentials));
    app.use(routers.initializeAPIRouter(SECRET_CODE));

    return app;
}


export default app;