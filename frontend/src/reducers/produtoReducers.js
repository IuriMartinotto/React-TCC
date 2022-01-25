import { FALHA_DETALHES_PRODUTO, FALHA_LISTA_PRODUTO, REQUISICAO_DETALHES_PRODUTO, REQUISICAO_LISTA_PRODUTO, SUCESSO_DETALHES_PRODUTO, SUCESSO_LISTA_PRODUTO } from "../constants/produtoConstants";

export const produtoListReducer = (state = { carregando: true, produtos: [] }, action) => {
    switch (action.type) {
        case REQUISICAO_LISTA_PRODUTO:
            return { carregando: true };
        case SUCESSO_LISTA_PRODUTO:
            return { carregando: false, produtos: action.payload };
        case FALHA_LISTA_PRODUTO:
            return { carregando: false, error: action.payload };
        default:
            return state;
    }
};

export const produtoDetalhesReducer = (state = {produto:{}, carregando: true}, action) => {
    switch (action.type) {
        case REQUISICAO_DETALHES_PRODUTO:
            return { carregando: true };
        case SUCESSO_DETALHES_PRODUTO:
            return { carregando: false, produto: action.payload };
        case FALHA_DETALHES_PRODUTO:
            return { carregando: false, error: action.payload };
        default:
            return state;
    }
};