const mysql = require("../mysql").pool;

exports.handleLogout = (req, res) => {
    // Deletar Token No Front

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //Sem Conteúdo

        const refreshToken = cookies.jwt;

        //Tem Um Token Do BD?
        const query = `SELECT * FROM administrador WHERE Refresh_Jwt_Key  = ?`;
        conn.query(query, [refreshToken], (error, results, fields) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            if (results.length < 1) {
                res.clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: 'None',
                });
                return res.status(204);
            }

            //Deletar o Token no BD
            const DeleteRefreshTokenDB = `Update administrador set Refresh_Jwt_Key = " " where Id_Adm = ${results[0].Id_Adm};`;
            conn.query(DeleteRefreshTokenDB, (error, results) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
            });
            res.clearCookie("jwt", {
                httpOnly: true,
                SameSite: 'None',
                Secure: true, 
            });
            res.sendStatus(204);
        });
    });
};
