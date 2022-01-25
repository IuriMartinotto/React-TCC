import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Produto from '../models/produtoModel.js';

const produtoRouter = express.Router();

produtoRouter.get('/', expressAsyncHandler(async (req, res) => {
    const produtos = await Produto.find({});
    res.send(produtos);
}));

produtoRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Produto.remove({});
    const createdProdutos = await Produto.insertMany(data.produtos);
    res.send({ createdProdutos });
}));

produtoRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const produto = await Produto.findById(req.params.id);
    if (produto) {
        res.send(produto);
    } else {
        res.status(404).send({ message: 'Produto não encontrado' });
    }
}));

export default produtoRouter;