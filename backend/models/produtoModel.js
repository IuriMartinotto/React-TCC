import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    imagem: { type: String, required: true },
    marca: { type: String, required: true },
    categoria: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    temStock: { type: Number, required: true },
    avaliacao: { type: Number, required: true },
    numAvaliacoes: { type: Number, required: true },
}, { timestamps: true, });

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;