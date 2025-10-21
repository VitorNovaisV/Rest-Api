const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
require("dotenv").config();


// RETORNA TODOS OS CLIENTES

exports.getAll = (req, res, next) => {
    const page = req.query._page || 1;

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query("SELECT * FROM cliente;", (error, result, fields) => {
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

//RETORNA PEDIDOS A PARTIR DO ID DO CLIENTE


exports.getPedidos = (req, res, next) => {
    
    const page = req.query._page || 1;
    
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({ error: error}) }  
        conn.query(
            `SELECT  *
            FROM pedido as p
            LEFT JOIN cliente as c
            on p.Id_cli = c.Id_cli
            WHERE p.Id_cli = ?
            order by Id_Pedido desc;`,
            [req.params.id_cliente],
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


//  RETORNA OS DADOS DE UM CLIENTE

exports.getOne = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT * FROM cliente WHERE Id_Cli = ?;",
            [req.params.id_cliente],
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


//  RETORNA O NÚMERO DE CLIENTES CADASTRADOS

exports.getQtd = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT COUNT(*) AS quantidade FROM cliente;",
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

//  INSERE UM CLIENTE

exports.addNew = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "SELECT * FROM cliente WHERE Email = ?",
            [req.body.email],
            (error, results) => {
                if (error) {
                    return res.status(500).send({ error: error });
                }
                if (results.length > 0) {
                    res.status(409).send({ mensagem: "Já Cadastrado" });
                } else {
                    conn.query(
                        "SELECT * FROM cliente WHERE Cpf_Cli = ?",
                        [req.body.cpfCli],
                        (error, results) => {
                            if (error) {
                                return res.status(500).send({ error: error });
                            }
                            if (results.length > 0) {
                                res.status(409).send({
                                    mensagem: "Já Cadastrado",
                                });
                            } else {
                                bcrypt.hash(
                                    req.body.senha,
                                    10,
                                    (errBcrypt, hash) => {
                                        if (errBcrypt) {
                                            return res
                                                .status(500)
                                                .send({ error: errBcrypt });
                                        }
                                        conn.query(
                                            `INSERT INTO cliente
                                        (
                                        Cpf_Cli,
                                        Nome,
                                        Sobrenome,
                                        Endereco,
                                        Bairro,
                                        Cidade,
                                        CEP,
                                        UF,
                                        Celular,
                                        Email,
                                        Senha
                                        )
                                        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,

                                            [
                                                req.body.cpfCli,
                                                req.body.nome,
                                                req.body.sobrenome,
                                                req.body.endereco,
                                                req.body.bairro,
                                                req.body.cidade,
                                                req.body.cep,
                                                req.body.uf,
                                                req.body.celular,
                                                req.body.email,
                                                hash,
                                            ],

                                            (error, resultado) => {
                                                conn.release();
                                                if (error) {
                                                    return res
                                                        .status(500)
                                                        .send({ error: error });
                                                }
                                                res.status(201).send({
                                                    mensagem:
                                                        "cliente Inserido com sucesso",
                                                    Id_Cliente:
                                                        resultado.insertId,
                                                });
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });
};

//  ALTERA UM CLIENTE

exports.update = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            `UPDATE cliente SET
            Cpf_Cli = ?,
            Nome = ?,
            Sobrenome = ?,
            Endereco = ?,
            Bairro = ?,
            Cidade = ?,
            CEP = ?,
            UF = ?,
            Celular = ?,
            Email = ?,
            Senha = ?
            WHERE Id_Cli = ?`,

            [
                req.body.cpfCli,
                req.body.nome,
                req.body.sobrenome,
                req.body.endereco,
                req.body.bairro,
                req.body.cidade,
                req.body.cep,
                req.body.uf,
                req.body.celular,
                req.body.email,
                req.body.senha,
                req.body.id_cliente,
            ],

            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: "cliente Alterado com sucesso",
                });
            }
        );
    });
};

//  DELETA UM ClIENTE

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            "DELETE FROM cliente WHERE Id_Cliente = ?",
            [req.body.id_cliente],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error });
                }
                res.status(202).send({
                    mensagem: "cliente Deletado com sucesso",
                });
            }
        );
    });
};
