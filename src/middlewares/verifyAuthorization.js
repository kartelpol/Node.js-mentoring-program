import jwt from 'jsonwebtoken';

export default function verifyAuthentication(secretCode) {
    return (req, res, next) => {
        const token = req.body.token || req.get('X-access-token');
        
        jwt.verify(token, secretCode, err =>  err ? res.status(401).end('Not authorized') : next());
    }
}
