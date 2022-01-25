import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        nome: user.nome,
        email: user.email,
        ehAdmin: user.ehAdmin,
    },
        process.env.JWT_SECRET || 'somethingsecret',
        { expiresIn: '1d' });
};