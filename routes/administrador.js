const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
require("dotenv").config();
//Dependencias


const loginController = require('../controllers/loginController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const admController = require('../controllers/admController');
//Controllers


//-------------------------------//  Rotas  //-----------------------------//

//  RETORNA PEDIDOS DENTRO DE UMA MARGEM DE TEMPO

router.get("/pedidosData/:anoI/:mesI/:diaI/:anoL/:mesL/:diaL", admController.getPedidosData);


//  RETORNA OS PRODUTOS MAIS VENDIDOS


router.get("/maisVendidos", admController.getMaisVendidos);


//  RETORNA A QUANTIDADE DE CLIENTES CADASTRADOS


router.get("/quantidadeCliente", admController.getQtdCliente);

//  RETORNA A QUANTIDADE DE VENDAS


router.get("/quantidadeVendas", admController.getQtdVendas);


//  RETORNA A QUANTIDADE DE VENDAS NO DIA


router.get("/quantidadeVendasDia/:ano/:mes/:dia", admController.getQtdVendasDia);


//  RETORNA A QUANTIDADE DE VENDAS NO MÊS


router.get("/quantidadeVendasMes/:ano/:mes", admController.getQtdVendasMes);


//LOGIN ADMINISTRADOR

router.post("/login", loginController.handleLogin);


//REFRESH TOKEN


router.get("/refresh", refreshTokenController.handleRefreshToken);


//LOGOUT ADMINISTRADOR

router.get("/logout", logoutController.handleLogout);



// RETORNA TODOS OS  ADMINISTRADORES


router.get("/", verifyJWT, admController.getAll);



//  RETORNA OS DADOS DE UM ADMINISTRADOR

router.get("/:id_adm", admController.getOne);


// INSERE UM ADMINISTRADOR

router.post("/cadastrar", admController.addNew); 


//  ALTERA UM ADMINISTRADOR

router.patch("/", admController.update);


//  DELETA UM ADMINISTRADOR

router.delete("/", admController.delete);


module.exports = router;
