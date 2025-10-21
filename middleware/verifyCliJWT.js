const jwt = require('jsonwebtoken');

const verifyCliJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const tokenCli = authHeader.split(' ')[1];
    jwt.verify(
        tokenCli,
        process.env.CLI_JWT_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //Token Inválido
            req.email = decoded.email;
            next();
        }
    );
}

module.exports = verifyCliJWT