const mysql = require("../mysql").pool;



// RETORNA TODAS AS  CATEGORIAS

exports.getAll = (req, res, next) => {
    
    const page = req.query._page || 1;
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            'SELECT * FROM categoria;',
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


//  RETORNA OS DADOS DE UMA CATEGORIA


exports.getOne = (req, res, next) => {
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            'SELECT * FROM categoria WHERE Id_Categoria = ?;',
            [req.params.id_categoria],
            (error, resultado, fields) =>{
                conn.release();
                if (error) { return res.status(500).send({ error: error}) } 
                return res.status(200).send(resultado)
            }
        )
    });
};


//  RETORNA O NÚMERO DE CATEGORIAS CADASTRADAS

exports.getQtd = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM categoria;",
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



// INSERE UMA CATEGORIA

exports.addNew = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            
            `INSERT INTO categoria
            (
            Nome_Categoria, 
            Em_Destaque, 
            Status_Categoria
            ) 
            VALUES (?,?,?)`,

            [
            req.body.nome, 
            req.body.emDestaque, 
            req.body.status
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                return res.status(201).send({
                    Id_Categoria: resultado.insertId
                });
            }
        )
    });
};


//  ALTERA UMA  CATEGORIA


exports.update = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            
            `UPDATE categoria SET 
            Nome_Categoria = ?,
            Em_Destaque = ?,
            Status_Categoria = ?
            WHERE Id_Categoria = ?`,

            [
            req.body.nome,
            Em_Destaque,
            req.body.status ,
            req.body.id_categoria
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'categoria Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O NOME DE UMA CATEGORIA


exports.updateNome = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE categoria SET 
            Nome_Categoria = ?
            WHERE Id_Categoria = ?;
            `
            ,

            [
            req.body.nome,
            req.body.id_categoria
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Campo "Nome" Da categoria Alterada com sucesso',
                });
            }
        )
    });
};

//  ALTERA O CAMPO "EM DESTAQUE" DE UMA CATEGORIA

exports.updateEmDestaque = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            
            `
            UPDATE categoria SET 
            Em_Destaque = ?
            WHERE Id_Categoria = ?;
            `
            ,

            [
            req.body.emDestaque,
            req.body.id_categoria
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Campo "Em Destaque" Da categoria Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O CAMPO "STATUS" DE UMA CATEGORIA


exports.updateStatus = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            
            `
            UPDATE categoria SET 
            Status_Categoria = ?
            WHERE Id_Categoria = ?;
            `
            ,

            [
            req.body.status,
            req.body.id_categoria
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Campo "Status" Da categoria Alterada com sucesso',
                });
            }
        )
    });
};



//  DELETA UMA CATEGORIA

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            'DELETE FROM categoria WHERE Id_Categoria = ?',
            [req.body.id_categoria],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'categoria Deletada com sucesso',
                });
            }
        )
    });
};
