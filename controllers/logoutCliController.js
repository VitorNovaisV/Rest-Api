const mysql = require("../mysql").pool;

exports.handleLogout = (req, res) => {
    // Deletar Token No Front

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const cookies = req.cookies;
        if (!cookies?.jwtCli) return res.sendStatus(204); //Sem Conteúdo

        const refreshToken = cookies.jwtCli;

        //Tem Um Token Do BD?
        const query = `SELECT * FROM cliente WHERE Refresh_Jwt_Key  = ?`;
        conn.query(query, [refreshToken], (error, results, fields) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            if (results.length < 1) {
                res.clearCookie("jwtCli", {
                    httpOnly: true,
                    SameSite: 'None',
                    Secure: true, 
                });
                return res.status(204);
            }

            //Deletar o Token no BD
            const DeleteRefreshTokenDB = `Update cliente set Refresh_Jwt_Key = " " where Id_Cli = ${results[0].Id_Cli};`;
            conn.query(DeleteRefreshTokenDB, (error, results) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
            });
            res.clearCookie("jwtCli", {
                httpOnly: true,
                sameSite: 'None',
            });
            res.sendStatus(204);
        });
    });
};
