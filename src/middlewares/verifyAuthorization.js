import jwt from 'jsonwebtoken';
import passport from 'passport';
import Local from 'passport-local';

export function verifyAuthorization(credentals, secretCode) {
    return (req, res, next) => {
        const token = req.body.token || req.get('X-access-token');
        
        jwt.verify(token, secretCode, err =>  err ? res.status(401).end('Not authorized') : next());
    }
}

export function passportLocal(credentials) {
    passport.use(new Local.Strategy({
        usernameField: 'name',
        passwordField: 'password',
        session: false
    },
    (username, password, done) =>  credentials[username] && credentials[username].password === password ?
         done(null, credentials[username]) : done(null, false, 'Wrong username or password!')
    ));
}