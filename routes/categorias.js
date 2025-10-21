const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
//Dependencias

const categoriasController = require('../controllers/categoriasController');
//Controllers


//-------------------------------//  Rotas  //-----------------------------//

//  RETORNA A QUANTIDADE DE CATEGORIAS


router.get("/quantidade", categoriasController.getQtd);


// RETORNA TODAS AS  CATEGORIAS


router.get("/", categoriasController.getAll);


//  RETORNA OS DADOS DE UMA CATEGORIA

router.get("/:id_categoria", categoriasController.getOne);


// INSERE UMA CATEGORIA


router.post("/",verifyJWT, categoriasController.addNew);


//  ALTERA UMA  CATEGORIA


router.patch("/",verifyJWT, categoriasController.update);


//  ALTERA O NOME DE UMA CATEGORIA


router.patch("/updateName",verifyJWT, categoriasController.updateNome);


//  ALTERA O CAMPO "EM DESTAQUE" DE UMA CATEGORIA


router.patch("/updateEmDestaque",verifyJWT, categoriasController.updateEmDestaque);


//  ALTERA O CAMPO "STATUS" DE UMA CATEGORIA


router.patch("/updateStatus",verifyJWT, categoriasController.updateStatus);


//  DELETA UMA CATEGORIA


router.delete("/", categoriasController.delete);


module.exports = router;
