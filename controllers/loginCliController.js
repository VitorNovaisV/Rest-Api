const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.handleLogin =  (req, res, next) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ 'message': 'Email and password are required.' });
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const query = `SELECT * FROM cliente WHERE Email = ?`;
        conn.query(query, [req.body.email], (error, results) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            if (results.length < 1) {
                return res
                    .status(401)
                    .send({ mensagem: "Falha na autenticação1" });
            };
            
            const match =  bcrypt.compare(req.body.senha, results[0].Senha, (err, result) => {
                if (result) {
                    const idCli = results[0].Id_Cli;
                    const nome = results[0].Nome;
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
                    const refreshTokenCli = jwt.sign(
                        {
                            Id_Cli: results[0].Id_Cli,
                            Email: results[0].Email,

                        },
                        `${process.env.CLI_REFRESH_JWT_KEY}`,
                        {
                            expiresIn: "2D",
                        }
                    );

                    const RefreshTokenDB = `Update cliente set Refresh_Jwt_Key = "${refreshTokenCli}" where Id_Cli = ${results[0].Id_Cli};`;
                    conn.query(RefreshTokenDB, (error, results) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({ error: error });
                        }
                    });

                    res.cookie("jwtCli", refreshTokenCli, {
                        httpOnly: true,
                        SameSite: 'None',
                        Secure: true,           
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    res.status(200).send({ idCli, nome, tokenCli, refreshTokenCli });
                    
                }
                else {
                    return res
                        .status(401)
                        .send({ mensagem: "Falha na autenticação" });
                }
            });
        });
    });
}