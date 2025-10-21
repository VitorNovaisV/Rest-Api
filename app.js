const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaCategorias = require('./routes/categorias');
const rotaBanners = require('./routes/banners');
const rotaItemPedido = require('./routes/itemPedido');
const rotaAdministrador = require('./routes/administrador');
const rotaCliente = require('./routes/cliente');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());; // json de entrada no body
app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/categorias', rotaCategorias);
app.use('/banners', rotaBanners);
app.use('/itemPedido', rotaItemPedido);
app.use('/admin', rotaAdministrador);
app.use('/cliente', rotaCliente);


//  Sem Rota

app.use((req, res, next) => {
    const erro = new Error(' 404 Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
        
});

module.exports = app;