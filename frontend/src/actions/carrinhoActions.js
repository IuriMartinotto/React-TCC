import Axios from 'axios';
import { CARRINHO_ADD_ITEM, CARRINHO_DELETE_ITEM, CARRINHO_SAVE_METODO_PAGAMENTO, CARRINHO_SAVE_SHIPPING } from "../constants/carrinhoConstants";

export const addToCart = (produtoID, qtd) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/produtos/${produtoID}`);
    dispatch({
        type: CARRINHO_ADD_ITEM,
        payload: {
            nome: data.nome,
            imagem: data.imagem,
            preco: data.preco,
            temStock: data.temStock,
            produtoTeste: data._id, //Produto aqui é o produto ID, para colocar na base de dados//
            qtd,
        },
    });
    localStorage.setItem('carrinhoItens', JSON.stringify(getState().carrinho.carrinhoItens));
};

export const removerDoCarrinhoReal = (produtoID) => (dispatch, getState) =>{
    dispatch({type: CARRINHO_DELETE_ITEM, payload: produtoID});
    localStorage.setItem('carrinhoItens', JSON.stringify(getState().carrinho.carrinhoItens));
};

export const saveShipping = (data) => (dispatch) => {
    dispatch({type: CARRINHO_SAVE_SHIPPING, payload: data});
    localStorage.setItem('enderecoEntrega', JSON.stringify(data));
};

export const saveMetodoPagamento = (data) => (dispatch) =>{
    dispatch({type: CARRINHO_SAVE_METODO_PAGAMENTO, payload: data});
}