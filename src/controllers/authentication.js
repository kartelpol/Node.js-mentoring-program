import jwt from 'jsonwebtoken';
import uuid from 'uuid';

export function authenticationController(credentials, secretCode) {
    return (req, res) => {
        const userInfo = req.body;

        if (credentials[userInfo.name].password === userInfo.password) {
            const token = jwt.sign( {password: userInfo.password}, secretCode, { expiresIn: 30 });
            const refreshToken = uuid();

            credentials[userInfo.name].refreshToken = refreshToken;

            const message = {
                code: 200,
                message: 'ok',
                data: {
                    user:  {
                        email: userInfo.email,
                        username: userInfo.name
                    }
                },
                refreshToken,
                token,
            };
            
            res
                .set({'X-access-token': token})
                .json(message);
            
        } else {
        res
            .status(401)
            .json({message: 'Not authorized'});
        }
    }
}


export function refreshTokenController(credentials, secretCode) {
    return (req, res) => {
        let refreshToken;
        let token;

        for (let key in credentials ) {
            if (credentials[key].refreshToken === req.body.refreshToken) {
                token = jwt.sign({ password: credentials[key].password }, secretCode, { expiresIn: 30 });
                refreshToken = credentials[key].refreshToken = uuid();
            }
        }

        refreshToken ? res.json({ refreshToken, token }) : res.status(401).send('Unauthorized');
    }
}

export function loginController(req, res) {
    res.status(200).end("You are successfully logged in");
}

export function facebookLoginRedirectController(req, res) {
    res.end('Successfully authenticate through facebook');
}