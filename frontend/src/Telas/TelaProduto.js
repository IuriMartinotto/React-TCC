import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Produto from '../components/Produto';
import Avaliacao from '../components/Avaliacao';
import { Link, withRouter } from 'react-router-dom';
import BoxCarregando from '../components/BoxCarregando';
import BoxMensagem from '../components/BoxMensagem';
import { detalhesProduto } from '../actions/produtoActions';

export default function TelaProduto(props) {
    const dispatch = useDispatch();
    const produtoID = props.match.params.id;
    const [qtd, setQtd] = useState(1);
    const produtoDetalhes = useSelector((state) => state.produtoDetalhes);
    const { carregando, erro, produto } = produtoDetalhes;

    useEffect(() => {
        dispatch(detalhesProduto(produtoID));
    }, [dispatch, produtoID]);

    const addToCartHandler = () => {
        props.history.push(`/carrinho/${produtoID}?qtd=${qtd}`);
    };

    return (
        <div>
            {carregando ? (<BoxCarregando></BoxCarregando>) :
                erro ? (<BoxMensagem variant="danger">{erro}</BoxMensagem>) : (
                    <div>
                        <Link to="/">Voltar</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={produto.imagem} alt={produto.name}></img>
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li><h1> {produto.nome} </h1></li>
                                    <li><Avaliacao avaliacao={produto.avaliacao} numAvaliacoes={produto.numAvaliacoes}></Avaliacao> </li>
                                    <li>Preço: R$ {produto.preco} </li>
                                    <li>Descição: <p>{produto.descricao}</p> </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Preço</div>
                                                <div className="preco">R$: {produto.preco}</div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>
                                                    {produto.temStock > 0 ? <span className="success">Em estoque</span> :
                                                        <span className="danger">Sem estoque</span>}
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            produto.temStock > 0 && (
                                                <>
                                                    <li>
                                                        <div className="row">
                                                            <div>Qtd</div>
                                                            <div>
                                                                <select value={qtd} onChange={e => setQtd(e.target.value)}>
                                                                    {
                                                                        [...Array(produto.temStock).keys()].map(x => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <button onClick={addToCartHandler}
                                                            className="primary block">Adicionar ao carrinho</button>
                                                    </li>
                                                </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)}
        </div>);
}