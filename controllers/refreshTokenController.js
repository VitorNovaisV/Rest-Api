const mysql = require("../mysql").pool;
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.handleRefreshToken =  (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

        const query = `SELECT * FROM Administrador WHERE Refresh_Jwt_Key  = ?`;
        conn.query(query, [refreshToken], (error, results) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            if (results.length < 1) {
                return res
                    .status(403)
                    .send({ mensagem: "Falha na autenticação" });
            }
            jwt.verify(
                refreshToken,
                `${process.env.REFRESH_JWT_KEY}`,
                (err, decoded) => {
                    if (err || results[0].Login !== decoded.Login)
                        return res.sendStatus(403);
                    const token = jwt.sign(
                        {
                            Id_Adm: results[0].Id_Adm,
                            Login: results[0].Login,
                        },
                        `${process.env.JWT_KEY}`,
                        {
                            expiresIn: "1D",
                        }
                    );
                    res.json({ token });
                }
            );
        });
    });
};