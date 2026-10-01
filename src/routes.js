const express = require('express');
const routes = express.Router();

const Cliente = require('./controllers/cliente.js');
const Pedido = require('./controllers/pedidos.js');
const Produto = require('./controllers/produtos.js');
const Item = require('./controllers/itens.js');

routes.put('/clientes/:id', Cliente.alterar);
routes.delete('/clientes/:id', Cliente.excluir);

routes.post('/pedidos', Pedido.criar);
routes.get('/pedidos', Pedido.listar);
routes.put('/pedidos/:id', Pedido.alterar);
routes.delete('/pedidos/:id', Pedido.excluir);

routes.put('/produtos/:id', Produto.alterar);
routes.delete('/produtos/:id', Produto.excluir);

routes.get('/itens', Item.listar);           
routes.get('/itens/:id', Item.buscarPorId); 
routes.post('/itens', Item.criar);           
routes.put('/itens/:id', Item.alterar);
routes.delete('/itens/:id', Item.excluir);

module.exports = routes;