const express = require("express");
const router = express.Router();
//Dependencias


const pedidosController = require('../controllers/pedidosController');
//Controllers


//-------------------------------//  Rotas  //-----------------------------//


//  RETORNA O TOTAL DE GANHOS NO MÊS


router.get("/GanhosMes/:ano/:mes", pedidosController.getMesGanhos);


//  RETORNA O TOTAL DE GANHOS NO DIA


router.get("/GanhosDia/:ano/:mes/:dia", pedidosController.getDiaGanhos);



//  RETORNA A QUANTIDADE DE PEDIDOS EM ANDAMENTO


router.get("/quantidadeAndamento", pedidosController.getQtdAndamento);


//  RETORNA A QUANTIDADE DE PEDIDOS CONCLUÍDOS


router.get("/quantidadeConcluido", pedidosController.getQtdConcluido);


//  RETORNA A QUANTIDADE DE PEDIDOS CANCELADOS


router.get("/quantidadeCancelado", pedidosController.getQtdCancelado);


//  RETORNA A QUANTIDADE DE PEDIDOS NO DIA


router.get("/PedidosDia/:ano/:mes/:dia", pedidosController.getDiaPedidos);


//  RETORNA A QUANTIDADE DE PEDIDOS NO MÊS


router.get("/PedidosMes/:ano/:mes", pedidosController.getMesPedidos);


//  RETORNA O TOTAL DE GANHOS


router.get("/GanhosTotais", pedidosController.getTotGanhos);


// RETORNA TODOS OS PEDIDOS


router.get("/", pedidosController.getAll);


//  RETORNA OS DADOS DE UM PEDIDO


router.get("/:id_pedido", pedidosController.getOne);


// INSERE UM PEDIDO


router.post("/", pedidosController.addNew);


//  ALTERA UM PEDIDO


router.patch("/", pedidosController.update);


//  DEFINE COMO CONCLUÍDO UM PEDIDO


router.patch("/concluir", pedidosController.concluir);


//  DEFINE COMO CANCELADO UM PEDIDO


router.patch("/cancelar", pedidosController.cancelar);



//  DELETA UM PEDIDO


router.delete("/", pedidosController.delete);


module.exports = router;
