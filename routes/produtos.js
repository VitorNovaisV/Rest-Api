const express = require("express");
const router = express.Router();
//Dependencias

const produtosController = require('../controllers/produtosController');
const verifyJWT = require("../middleware/verifyJWT");
//Controllers


//-------------------------------//  Rotas  //-----------------------------//

//  RETORNA A QUANTIDADE DE PRODUTOS


router.get("/quantidade", produtosController.getQtd);


// RETORNA TODOS OS PRODUTOS


router.get("/", produtosController.getAll);


//  RETORNA OS DADOS DE UM PRODUTO


router.get("/:id_produto", produtosController.getOne);


//  INSERE UM PRODUTO


router.post("/",verifyJWT, produtosController.addNew);


//  ALTERA UM PRODUTO


router.patch("/",verifyJWT, produtosController.update);


//  ALTERA A IMAGEM DE UM PRODUTO


router.patch("/updateImg",verifyJWT, produtosController.updateImg);


//  ALTERA A CATEGORIA DE UM PRODUTO


router.patch("/updateCategoria",verifyJWT, produtosController.updateCateg);


//  ALTERA O NOME DE UM PRODUTO


router.patch("/updateNome",verifyJWT, produtosController.updateNome);


//  ALTERA A  DESCRIÇÃO DE UM PRODUTO

router.patch("/updateDesc",verifyJWT, produtosController.updateDesc);


//  ALTERA O PREÇO DE UM PRODUTO


router.patch("/updateValor",verifyJWT, produtosController.updateValor);


//  ALTERA O STATUS DE UM PRODUTO


router.patch("/updateStatus",verifyJWT, produtosController.updateStatus);


//  ALTERA O EM OFERTA DE UM PRODUTO

router.patch("/updateEmOferta",verifyJWT, produtosController.updateEmOferta);


//  DELETA UM PRODUTO


router.delete("/", produtosController.delete);


module.exports = router;
