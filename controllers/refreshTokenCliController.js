const mysql = require("../mysql").pool;
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.handleRefreshToken =  (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const cookies = req.cookies;
        if (!cookies?.jwtCli) return res.sendStatus(401);
        const refreshTokenCli = cookies.jwtCli;

        const query = `SELECT * FROM cliente WHERE Refresh_Jwt_Key  = ?`;
        conn.query(query, [refreshTokenCli], (error, results) => {
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
                refreshTokenCli,
                `${process.env.CLI_REFRESH_JWT_KEY}`,
                (err, decoded) => {
                    if (err || results[0].Email !== decoded.Email)
                        return res
                        .status(403)
                        .send({ mensagem: err });
                    const tokenCli = jwt.sign(
                        {
                            Id_Cli: results[0].Id_Cli,
                            Email: results[0].Email,
                        },
                        `${process.env.CLI_JWT_KEY}`,
                        {
                            expiresIn: "1D",
                        }
                    );
                    res.json({ tokenCli });
                }
            );
        });
    });
};