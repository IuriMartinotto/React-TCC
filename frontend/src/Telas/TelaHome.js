import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Produto from '../components/Produto';
import BoxMensagem from '../components/BoxMensagem';
import BoxCarregando from '../components/BoxCarregando';
import { useDispatch, useSelector } from 'react-redux';
import { listProdutos } from '../actions/produtoActions';
import { Paginacao } from '../components/Paginacao';

export default function TelaHome() {

    const dispatch = useDispatch();
    const produtoList = useSelector(state => state.produtoList);
    const { carregando, erro, produtos } = produtoList;

    //Pesquisa
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    //Paginacao
    const [pageNumber, setPageNumber] = useState(0);
    const produtosPorPagina = 3;
    const paginasVisitadas = pageNumber * produtosPorPagina;

    //const mostrarProdutos = produtos.slice(paginasVisitadas, paginasVisitadas + produtosPorPagina).map(x => {
    //    <div className="row center">{
    //        searchResults.map((produto) => (
    //            <Produto key={produto._id} produto={produto}></Produto>
    //        ))}
    //    </div>
    //})

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const results = produtos.filter(x =>
            x.nome.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    useEffect(() => {
        dispatch(listProdutos());
        setSearchResults(produtos);
    }, []);


    return (
        <div>
            <div className="row center">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            {
                carregando ? (<BoxCarregando></BoxCarregando>)
                    :
                    erro ? (<BoxMensagem variant="danger">{erro}</BoxMensagem>)
                        :
                        (
                            //{mostrarProdutos}
                            <div className="row center">{
                                searchResults.map((produto) => (//produtos
                                    <Produto key={produto._id} produto={produto}></Produto>
                                ))}
                            </div>
                        )
            }
        </div>
    );
};