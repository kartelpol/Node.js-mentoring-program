import jwt from 'jsonwebtoken';
import uuid from 'uuid';

export function authorizationController(credentials, secretCode) {
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
            .status(404)
            .json({message: 'Not found'});
        }
    }
}


export function refreshTokenController(credentials, secretCode) {
    return (req, res) => {
        let authorized = false;
        let refreshToken;
        let token;

        for (let key in credentials ) {
            if (credentials[key].refreshToken === req.body.refreshToken) {
                authorized = true;

                token = jwt.sign({ password: credentials[key].password }, secretCode, { expiresIn: 30 });
                refreshToken = credentials[key].refreshToken = uuid();
            }
        }

        refreshToken ? res.json({ refreshToken, token }) : res.status(401).send('Unauthorized');
    }
}

