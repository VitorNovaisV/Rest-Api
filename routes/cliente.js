const express = require("express");
const verifyJWT = require("../middleware/verifyCliJWT");
const router = express.Router();
//Dependencias


const clienteController = require('../controllers/clienteController');
const refreshTokenCliController = require('../controllers/refreshTokenCliController');
const logoutCliController = require('../controllers/logoutCliController');
const loginCliController = require('../controllers/loginCliController');
//Controllers



//-------------------------------//  Rotas  //-----------------------------//



//  RETORNA OS DADOS DO PRODUTO DE UM CLIENTE


router.get("/pedidos/:id_cliente", clienteController.getPedidos);




//  RETORNA A QUANTIDADE DE CLIENTES


router.get("/quantidade", clienteController.getQtd);


//LOGIN CLIENTE

router.post("/login", loginCliController.handleLogin);


//REFRESH TOKENCLI


router.get("/refresh", refreshTokenCliController.handleRefreshToken);


//LOGOUT CLIENTE

router.get("/logout", logoutCliController.handleLogout);

// RETORNA TODOS OS CLIENTES


router.get("/", clienteController.getAll);


//  RETORNA OS DADOS DE UM CLIENTE


router.get("/:id_cliente", clienteController.getOne);



// INSERE UM Cliente

router.post("/cadastrar", clienteController.addNew);


//  ALTERA UM CLIENTE


router.patch("/", clienteController.update);


//  DELETA UM ClIENTE


router.delete("/", clienteController.delete);


module.exports = router;
