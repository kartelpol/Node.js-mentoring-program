import passport from 'passport';
import Local from 'passport-local';
import Facebook from 'passport-facebook';

const FACEBOOK_APP_ID = '612860929184827';
const FACEBOOK_APP_SECRET = '133a3b9d9aefe3f82a4e6146b14f0a54';

export default function setupPassport(credentials) {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    passport.use(new Local.Strategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        (username, password, done) =>  credentials[username] && credentials[username].password === password ?
            done(null, credentials[username]) : done(null, false, "Basic")
    ));

    passport.use(new Facebook.Strategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8080/login/facebook/callback"
        },
        (accessToken, refreshToken, profile, cb) => cb(null, { facebookId: profile.id })
    ));
}
