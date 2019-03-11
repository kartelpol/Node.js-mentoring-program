import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import db from './db/authentication';

export function authenticationController(secretCode) {
    return async (req, res) => {
        const userInfo = req.body;
        const user = await db.getUserByCredentials(userInfo.name, userInfo.password);
        const getAuthSuccessMsg = (refreshToken, token) => ({
            code: 200,
            message: 'ok',
            data: {
                user: {
                    email: userInfo.email,
                    username: userInfo.name
                }
            },
            refreshToken,
            token,
        });

        if (user) {
            refreshToken(user, secretCode, (refreshToken, token) => res.set({'X-access-token': token})
                .json(getAuthSuccessMsg(refreshToken, token)));
        } else {
            res
                .status(401)
                .json({message: 'Not authorized'});
        }
    }
}

export function refreshTokenController(secretCode) {
    return async (req, res) => {
        const user = await db.getUserByRefreshToken(req.body.refreshToken);

        if (user) {
            refreshToken(user, secretCode, (refreshToken, token) => res.json({refreshToken, token}));
        } else {
            res.status(401).send('Unauthorized');
        }
    }
}

function refreshToken(user, secretCode, callback) {
    const token = jwt.sign({password: user.password}, secretCode, {expiresIn: 30});
    const refreshToken = uuid();

    return db.setRefreshToken(user, refreshToken)
        .then(() => callback(refreshToken, token))
        .catch(err => res.send(err));

}

export function loginController(req, res) {
    res.status(200).end("You are successfully logged in");
}

export function facebookLoginRedirectController(req, res) {
    res.end('Successfully authenticate through facebook');
}
