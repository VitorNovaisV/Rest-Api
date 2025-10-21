const mysql = require("../mysql").pool;



// RETORNA TODOS OS PRODUTOS

exports.getAll = (req, res, next) => {
    
    const page = req.query._page || 1;
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            'SELECT * FROM produto;',
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



//  RETORNA OS DADOS DE UM PRODUTO

exports.getOne = (req, res, next) => {
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            `SELECT  p.Id_Produto, p.Id_Categoria, p.Nome_Produto,
            p.Descricao, p.Valor, p.Status_Produto, p.Em_Oferta,
            p.Em_Estoque, p.Link_Imagem_Produto,  c.Nome_Categoria
            FROM produto as p
            LEFT JOIN categoria as c
                    on p.Id_Categoria = c.Id_Categoria
                    WHERE p.Id_Produto = ?;`,
            [req.params.id_produto],
            (error, resultado, fields) =>{
                conn.release();
                if (error) { return res.status(500).send({ error: error}) } 
                return res.status(200).send(resultado)
            }
        )
    });
};


//  RETORNA O NÚMERO DE PRODUTOS CADASTRADOS

exports.getQtd = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM produto;",
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


//  INSERE UM PRODUTO


exports.addNew = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            `INSERT INTO produto 
            (
            Id_Categoria,    
            Nome_Produto,
            Descricao,
            Valor,
            Status_Produto,
            Em_Oferta,
            Link_Imagem_Produto,
            Em_Estoque
            ) 
            VALUES (?,?,?,?,?,?,?,?)`,

            [
            req.body.id_categoria, 
            req.body.nome,
            req.body.descricao,
            req.body.valor,
            req.body.status,
            req.body.emOferta, 
            req.body.linkImagemProduto,
            req.body.emEstoque
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(201).send({
                    mensagem: 'produto Inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
};


//  ALTERA UM PRODUTO


exports.update = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `UPDATE produto SET 
            Id_Categoria = ?, 
            Nome_Produto = ?,
            Descricao = ?, 
            Valor = ?, 
            Status_Produto = ?,
            Em_Oferta = ?,  
            Link_Imagem_Produto = ?,
            Em_Estoque = ?
            WHERE Id_Produto = ?`,

            [
            req.body.id_categoria, 
            req.body.nome,
            req.body.descricao,
            req.body.valor,
            req.body.status,
            req.body.emOferta,
            req.body.linkImagemProduto,
            req.body.emEstoque,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'produto Alterado com sucesso',
                });
            }
        )
    });
};


//  ALTERA A IMAGEM DE UM PRODUTO


exports.updateImg = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Link_Imagem_Produto = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.linkImagemProduto,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Imagem Do produto Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA A CATEGORIA DE UM PRODUTO

exports.updateCateg = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Id_Categoria = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.id_categoria,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Categoria Do produto Alterada com sucesso',
                });
            }
        )
    });
};

//  ALTERA O NOME DE UM PRODUTO

exports.updateNome = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Nome_Produto = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.nome,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Nome Do produto Alterado com sucesso',
                });
            }
        )
    });
};


//  ALTERA A  DESCRIÇÃO DE UM PRODUTO

exports.updateDesc = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Descricao = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.descricao,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Descrição Do produto Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O PREÇO DE UM PRODUTO

exports.updateValor = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Valor = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.valor,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Valor Do produto Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O STATUS DE UM PRODUTO


exports.updateStatus = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Status_Produto = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.status,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Status Do produto Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O EM OFERTA DE UM PRODUTO


exports.updateEmOferta = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Em_Oferta = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.emOferta,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Campo Em Oferta Do produto Alterada com sucesso',
                });
            }
        )
    });
};


//  ALTERA O EM ESTOQUE DE UM PRODUTO


exports.updateEmEstoque = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(

            `
            UPDATE produto SET 
            Em_Estoque = ?
            WHERE Id_Produto = ?;
            `
            ,

            [
            req.body.emEstoque,
            req.body.id_produto
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'Campo Em Estoque Do produto Alterada com sucesso',
                });
            }
        )
    });
};


//  DELETA UM PRODUTO

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }    
        conn.query(
            'DELETE FROM produto WHERE Id_Produto = ?',
            [req.body.id_produto],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }    
                res.status(202).send({
                    mensagem: 'produto Deletado com sucesso',
                });
            }
        )
    });
};