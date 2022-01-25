import React from 'react'
import {Link} from 'react-router-dom'
import Avaliacao from './Avaliacao';

export default function Produto(props) {
    const { produto } = props;
    return (
        <div key={produto._id} className="card">
            <Link to={`/produtos/${produto._id}`}>
                <img className="medium" src={produto.imagem} alt={produto.nome}></img>
            </Link>
            <div className="card-body">
                <Link to={`/produtos/${produto._id}`}>
                    <h2>{produto.nome}</h2>
                </Link>
                <Avaliacao avaliacao={produto.avaliacao} numAvaliacoes={produto.numAvaliacoes}></Avaliacao>
                <div className="price">
                    R$ {produto.preco}
                </div>
            </div>
        </div>
    )
}