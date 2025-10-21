const mysql = require("../mysql").pool;
//Dependencias


// RETORNA TODOS OS BANNERS

exports.getAll = (req, res, next) => {
    
    const page = req.query._page || 1;
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            'SELECT * FROM banner;',
            (error, result, fields) =>{
                if (error) { return res.status(500).send({ error: error}) } 
                conn.release();
                const limit = req.query._limit || result.length

                let startIndex  =  (page - 1) * limit
                let endIndex = page * limit

                const resultado = result.slice(startIndex,endIndex)
                return(
                    (res.status(200).send(resultado) ))
                
            }
        )
    });
};


//  RETORNA OS DADOS DE UM BANNER

exports.getOne = (req, res, next) => {
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            'SELECT * FROM banner WHERE Id_Banner = ?;',
            [req.params.id_banner],
            (error, resultado, fields) =>{
                conn.release();
                if (error) { return res.status(500).send({ error: error}) } 
                return res.status(200).send(resultado)
            }
        )
    });
};


//  RETORNA O NÚMERO DE BANNERS CADASTRADAS

exports.getQtd = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM banner;",
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                return res.status(200).send(resultado);
            }
        );
    });
};


// INSERE UM BANNER
exports.addNew = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            `INSERT INTO banner
            (
            Nome, 
            Link_Banner_Imagem, 
            Status_Banner,
            Descricao
            ) 
            VALUES (?,?,?,?)`,

            [
            req.body.nome, 
            req.body.linkBannerImagem, 
            req.body.status,
            req.body.descricao
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(201).send({
                    mensagem: 'banner Inserido com sucesso',
                    id_Banner: resultado.insertId
                });
            }
        )
    });
};


//  ALTERA UM BANNER


exports.update = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            
            `UPDATE banner SET 
            Nome = ?,
            Descricao = ?,
            Link_Banner_Imagem = ?,
            Status_Banner = ?
            WHERE Id_Banner = ?`,

            [
            req.body.nome,
            req.body.descricao,
            req.body.linkBannerImagem,
            req.body.status,
            req.body.id_banner
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'banner Alterado com sucesso',
                });
            }
        )
    });
};


//  ALTERA A IMAGEM DE UM BANNER

exports.updateImg = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE banner SET 
            Link_Banner_Imagem = ?
            WHERE Id_Banner = ?;
            `
            ,

            [
            req.body.linkBannerImagem,
            req.body.id_banner
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Imagem Do banner Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O NOME DE UM BANNER

exports.updateNome = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE Banner SET 
            Nome = ?
            WHERE Id_Banner = ?;
            `
            ,

            [
            req.body.nome,
            req.body.id_banner
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Nome Do Banner Alterado com sucesso',
                });
            }
        )
    });
};


//  ALTERA A  DESCRIÇÃO DE UM BANNER

exports.updateDesc = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE Banner SET 
            Descricao = ?
            WHERE Id_Banner = ?;
            `
            ,

            [
            req.body.descricao,
            req.body.id_banner
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Descrição Do Banner Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O STATUS DE UM BANNER

exports.updateStatus = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE Banner SET 
            Status_Banner = ?
            WHERE Id_Banner = ?;
            `
            ,

            [
            req.body.status,
            req.body.id_banner
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Status Do Banner Alterada com sucesso',
                });
            }
        )
    });
};


//  DELETA UM BANNER

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            'DELETE FROM Banner WHERE Id_Banner = ?',
            [req.body.id_banner],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Banner Deletado com sucesso',
                });
            }
        )
    });
};