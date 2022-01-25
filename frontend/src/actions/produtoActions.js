import Axios from "axios";
import { FALHA_DETALHES_PRODUTO, FALHA_LISTA_PRODUTO, REQUISICAO_DETALHES_PRODUTO, REQUISICAO_LISTA_PRODUTO, SUCESSO_DETALHES_PRODUTO, SUCESSO_LISTA_PRODUTO } from "../constants/produtoConstants"

export const listProdutos = () => async (dispatch) => {
    dispatch({
        type: REQUISICAO_LISTA_PRODUTO
    });
    try {
        const { data } = await Axios.get('/api/produtos');
        dispatch({ type: SUCESSO_LISTA_PRODUTO, payload: data });
    } catch (error) {
        dispatch({ type: FALHA_LISTA_PRODUTO, payload: error.message });
    }
};

export const detalhesProduto = (produtoID) => async (dispatch) => {
    dispatch({ type: REQUISICAO_DETALHES_PRODUTO, payload: produtoID });
    try {
        const { data } = await Axios.get(`/api/produtos/${produtoID}`);
        dispatch({ type: SUCESSO_DETALHES_PRODUTO, payload: data });
    } catch (error) {
        dispatch({
            type: FALHA_DETALHES_PRODUTO, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};