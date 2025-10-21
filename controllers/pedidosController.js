const mysql = require("../mysql").pool;

// RETORNA TODOS OS PEDIDOS

exports.getAll = (req, res, next) => {
    const page = req.query._page || 1;

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `SELECT  *
            FROM pedido as p
            LEFT JOIN cliente as c
            on p.Id_cli = c.Id_cli
            order by Id_Pedido desc;`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error });
                }
                conn.release();
                const limit = req.query._limit || result.length;

                let startIndex = (page - 1) * limit;
                let endIndex = page * limit;

                const resultado = result.slice(startIndex, endIndex);
                return res.status(200).send(resultado);
            }
        );
    });
};

//  RETORNA O NÚMERO DE PEDIDOS EM ANDAMENTO

exports.getQtdAndamento = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM pedido where Status_Pedido = 1;",
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

//  RETORNA O NÚMERO DE PEDIDOS CONCLUÍDOS

exports.getQtdConcluido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM pedido where Status_Pedido = 2;",
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

//  RETORNA O NÚMERO DE PEDIDOS CANCELADOS

exports.getQtdCancelado = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM pedido where Status_Pedido = 3;",
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

//  RETORNA O TOTAL DE GANHOS

exports.getTotGanhos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `select sum((Valor * Prod_Quantidade)) 
            as valorTotal from itempedido 
            join pedido 
            on itempedido.Id_Pedido = pedido.Id_Pedido 
            where Status_pedido = 2 ; `,
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

//  RETORNA O TOTAL DE GANHOS NO MÊS

exports.getMesGanhos = (req, res, next) => {
    let ano = req.params.ano
    let mes = req.params.mes
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `select sum((Valor * Prod_Quantidade)) 
            as valorTotalMes from itempedido 
            join pedido 
            on itempedido.Id_Pedido = pedido.Id_Pedido 
            where Status_pedido = 2
            and Data_Pedido like "${ano}-${mes}%"; `,
            [req.params.ano, req.params.mes],
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


//  RETORNA O TOTAL DE GANHOS NO DIA

exports.getDiaGanhos = (req, res, next) => {
    let ano = req.params.ano
    let mes = req.params.mes
    let dia = req.params.dia
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `select sum((Valor * Prod_Quantidade)) 
            as valorTotalDia from itempedido 
            join pedido 
            on itempedido.Id_Pedido = pedido.Id_Pedido 
            where Status_pedido = 2
            and Data_Pedido like "${ano}-${mes}-${dia}"; `,
            [req.body.ano, req.body.mes, req.body.dia],
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


//  RETORNA A QUANTIDADE DE PEDIDOS NO DIA

exports.getDiaPedidos = (req, res, next) => {
    let ano = req.params.ano
    let mes = req.params.mes
    let dia = req.params.dia
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `select 
            count(*) 
            as quantidade 
            from pedido 
            where Data_Pedido 
            like "${ano}-${mes}-${dia}"`,
            [req.body.ano, req.body.mes, req.body.dia],
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




//  RETORNA A QUANTIDADE DE PEDIDOS NO MÊS

exports.getMesPedidos = (req, res, next) => {
    let ano = req.params.ano
    let mes = req.params.mes
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `select 
            count(*) 
            as quantidade 
            from pedido 
            where Data_Pedido 
            like "${ano}-${mes}%"`,
            [req.body.ano, req.body.mes],
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





//  RETORNA OS DADOS DE UM PEDIDO

exports.getOne = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `SELECT  *
            FROM pedido as p
            LEFT JOIN cliente as c
            on p.Id_Cli = c.Id_cli
            WHERE p.Id_Pedido = ?;`,
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

// INSERE UM PEDIDO

exports.addNew = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `INSERT INTO pedido
            (
            Id_Cli, 
            Data_Pedido, 
            FormaPagamento,
            Observacao,
            Status_Pedido
            ) 
            VALUES (?,current_date(),?,?,1)`,

            [req.body.id_Cli, req.body.formaPagamento, req.body.observacao],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                return res.status(201).send({
                    Id_Pedido: resultado.insertId,
                });
            }
        );
    });
};

//  ALTERA UM PEDIDO

exports.update = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `UPDATE pedido SET 
            Id_Cli = ?,
            Data_Pedido = ?,
            FormaPagamento = ?,
            Status_Pedido = ?,
            Data_Cancelamento = ?, 
            Motivo_Cancelamento = ?
            WHERE Id_Pedido = ?`,

            [
                req.body.id_Cli,
                req.body.dataPedido,
                req.body.formaPagamento,
                req.body.status,
                req.body.dataCancelamento,
                req.body.motivoCancelamento,
                req.body.id_pedido,
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: "pedido Alterado com sucesso",
                });
            }
        );
    });
};

//  ALTERA O CAMPO "STATUS" PARA CONCLUÍDO DE UM PEDIDO

exports.concluir = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `
            UPDATE pedido SET 
            Status_pedido = 2
            WHERE Id_Pedido = ?;
            `,
            [req.body.id_pedido],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: `Pedido Nº ${req.body.id_pedido} Definido como Concluído com sucesso`,
                });
            }
        );
    });
};

//  ALTERA O CAMPO "STATUS" PARA CANCELADO DE UM PEDIDO

exports.cancelar = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `
            UPDATE pedido SET 
            Status_pedido = 3,
            Data_Cancelamento = current_date(),
            Motivo_Cancelamento = ?
            WHERE Id_Pedido = ?;
            `,
            [req.body.motivoCancelamento, req.body.id_pedido],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: `Pedido Nº ${req.body.id_pedido} Definido como Cancelado com sucesso`,
                });
            }
        );
    });
};

//  DELETA UM PEDIDO

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "DELETE FROM pedido WHERE Id_Pedido = ?",
            [req.body.id_pedido],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: "pedido Deletado com sucesso",
                });
            }
        );
    });
};
