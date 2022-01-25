import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import produtoRouter from './routers/produtoRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/AplicacaoReact', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/produtos', produtoRouter);

//app.get('/api/produtos/:id', (req, res) => {
//    const produto = data.produtos.find(x => x.id === req.params.id);
//    if (produto) {
//        res.send(produto);
//    } else {
//        res.status(404).send({ message: 'Produto não encontrado' });
//    }
//});

//app.get('/api/produtos', (req, res) => {
//    res.send(data.produtos);
//});

app.get('/', (req, res) => {
    res.send('Servidor estar pronto');
});

app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`);
});