const mysql = require("../mysql").pool;

// RETORNA TODOS OS ITENS DOS PEDIDOS

exports.getAll = (req, res, next) => {
    const page = req.query._page || 1;

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query("SELECT * FROM itemPedido;", (error, result, fields) => {
            if (error) {
                return res.status(500).send({ error: error });
            }
            conn.release();
            const limit = req.query._limit || result.length;

            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;

            const resultado = result.slice(startIndex, endIndex);
            return res.status(200).send(resultado);
        });
    });
};

//  RETORNA OS DADOS DE UM ITEM PEDIDO

exports.getOne = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT * FROM itemPedido WHERE Id_ItemPedido = ?;",
            [req.params.id_itemPedido],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                return res.status(200).send({ response: resultado });
            }
        );
    });
};

//  RETORNA OS DADOS DE UM ITEM PEDIDO DE UM PEDIDO

exports.getItemsPedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `SELECT  *
            FROM itempedido as ip
            LEFT JOIN produto as p
            on ip.Id_produto = p.Id_produto
            WHERE ip.Id_Pedido = ?;`,
            [req.params.id_pedido],
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

//  INSERE UM ITEM PEDIDO

exports.addNew = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `INSERT INTO itemPedido 
            (
            Id_Pedido,
            Id_Produto,
            Valor,
            Prod_Quantidade
            ) 
            VALUES (?,?,?,?)`,

            [
                req.body.id_pedido,
                req.body.id_produto,
                req.body.valor,
                req.body.prodQuantidade,
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(201).send({
                    mensagem: "itemPedido Inserido com sucesso",
                    Id_ItemPedido: resultado.insertId,
                });
            }
        );
    });
};

//  ALTERA UM ITEM PEDIDO

exports.update = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `UPDATE itemPedido SET 
            Id_Pedido = ?, 
            Id_Produto = ?,
            Valor = ?,
            Prod_Quantidade = ?
            WHERE Id_ItemPedido = ?`,

            [
                req.body.id_pedido,
                req.body.id_produto,
                req.body.valor,
                req.body.prodQuantidade,
                req.body.id_itemPedido,
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: "itemPedido Alterado com sucesso",
                });
            }
        );
    });
};

//  DELETA UM ITEM PEDIDO

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "DELETE FROM itemPedido WHERE Id_ItemPedido = ?",
            [req.body.id_produto],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: "itemPedido Deletado com sucesso",
                });
            }
        );
    });
};
