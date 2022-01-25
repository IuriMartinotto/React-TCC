import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
}));

userRouter.post('/logar', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.senha, user.senha)) {
            res.send({
                _id: user._id,
                nome: user.nome,
                email: user.email,
                ehAdmin: user.ehAdmin,
                toke: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Senha ou e-mail inválidos' });
}));

userRouter.post('/registrar', expressAsyncHandler(async (req, res) => {
    const user = new User({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 8),
    });

    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        nome: createdUser.nome,
        email: createdUser.email,
        ehAdmin: createdUser.ehAdmin,
        toke: generateToken(createdUser),
    });
}));

export default userRouter;