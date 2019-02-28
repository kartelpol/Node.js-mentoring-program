import jwt from 'jsonwebtoken';
import uuid from 'uuid';

export function authenticationController(secretCode) {
    return async (req, res) => {
        const userInfo = req.body;
        const userResponse = await req.context.models.User.findAll({
            where: {
                name: userInfo.name,
                password: userInfo.password
            }
        });

        const user = userResponse[0];

        if (user) {
            const token = jwt.sign({password: userInfo.password}, secretCode, {expiresIn: 30});
            const refreshToken = uuid();

            const message = {
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
            };

            user.refreshToken = refreshToken;
            user.save()
                .then(() => res.set({'X-access-token': token}).json(message))
                .catch(err => res.send(err));
        } else {
            res
                .status(401)
                .json({message: 'Not authorized'});
        }
    }
}


export function refreshTokenController(secretCode) {
    return async (req, res) => {
        let refreshToken;
        let token;

        const userResponse = await req.context.models.User.findAll({
            where: {
                refreshToken: req.body.refreshToken,
            }
        });

        const user = userResponse[0];
        if (user) {
            token = jwt.sign({password: user.password}, secretCode, {expiresIn: 30});
            refreshToken = user.refreshToken = uuid();
            user.save()
                .then(() => res.json({refreshToken, token}))
                .catch(err => res.send(err));
        } else {
            res.status(401).send('Unauthorized');
        }
    }
}

export function loginController(req, res) {
    res.status(200).end("You are successfully logged in");
}

export function facebookLoginRedirectController(req, res) {
    res.end('Successfully authenticate through facebook');
}
