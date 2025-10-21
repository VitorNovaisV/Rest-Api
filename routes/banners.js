const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
//Dependencias

const bannersController = require('../controllers/bannersController');
//Controllers


//-------------------------------//  Rotas  //-----------------------------//

//  RETORNA A QUANTIDADE DE BANNERS


router.get("/quantidade", bannersController.getQtd);



// RETORNA TODOS OS BANNERS


router.get("/", bannersController.getAll);


//  RETORNA OS DADOS DE UM BANNER


router.get("/:id_banner", bannersController.getOne);


// INSERE UM BANNER


router.post("/",verifyJWT, bannersController.addNew);


//  ALTERA UM BANNER


router.patch("/",verifyJWT, bannersController.update);


//  ALTERA A IMAGEM DE UM BANNER


router.patch("/updateImg",verifyJWT, bannersController.updateImg);


//  ALTERA O NOME DE UM BANNER


router.patch("/updateNome",verifyJWT, bannersController.updateNome);


//  ALTERA A  DESCRIÇÃO DE UM BANNER


router.patch("/updateDesc",verifyJWT, bannersController.updateDesc);


//  ALTERA O STATUS DE UM BANNER

router.patch("/updateStatus",verifyJWT, bannersController.updateStatus);


//  DELETA UM BANNER


router.delete("/", bannersController.delete);


module.exports = router;
