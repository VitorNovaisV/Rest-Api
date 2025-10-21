const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.handleLogin =  (req, res, next) => {
    const { login, senha } = req.body;
    if (!login || !senha) return res.status(400).json({ 'message': 'Username and password are required.' });
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const query = `SELECT * FROM administrador WHERE Login = ?`;
        conn.query(query, [req.body.login], (error, results) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            if (results.length < 1) {
                return res
                    .status(401)
                    .send({ mensagem: "Falha na autenticação1" });
            }
            
            const match =  bcrypt.compare(req.body.senha, results[0].Senha, (err, result) => {
                if (result) {
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
                    const refreshToken = jwt.sign(
                        {
                            Id_Adm: results[0].Id_Adm,
                            Login: results[0].Login,
                        },
                        `${process.env.REFRESH_JWT_KEY}`,
                        {
                            expiresIn: "2D",
                        }
                    );

                    const RefreshTokenDB = `Update administrador set Refresh_Jwt_Key = "${refreshToken}" where Id_Adm = ${results[0].Id_Adm};`;
                    conn.query(RefreshTokenDB, (error, results) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({ error: error });
                        }
                    });

                    res.cookie("jwt", refreshToken, {
                        httpOnly: true,
                        SameSite: 'None',
                        Secure: true,            
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    res.status(200).send({ token, refreshToken});
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