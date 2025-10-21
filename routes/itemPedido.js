const express = require("express");
const router = express.Router();
//Dependencias

const itemPedidoController = require('../controllers/itemPedidoController');
//Controllers


//-------------------------------//  Rotas  //-----------------------------//

//  RETORNA OS DADOS DE UM ITEM PEDIDO A PARTIR DE UM ID_PEDIDO


router.get("/getItemPedido/:id_pedido", itemPedidoController.getItemsPedido);



// RETORNA TODOS OS ITENS DOS PEDIDOS


router.get("/", itemPedidoController.getAll);


//  RETORNA OS DADOS DE UM ITEM PEDIDO


router.get("/:id_itemPedido", itemPedidoController.getOne);


//  INSERE UM ITEM PEDIDO


router.post("/", itemPedidoController.addNew);


//  ALTERA UM ITEM PEDIDO


router.patch("/", itemPedidoController.update);


//  DELETA UM ITEM PEDIDO


router.delete("/", itemPedidoController.delete);


module.exports = router;
