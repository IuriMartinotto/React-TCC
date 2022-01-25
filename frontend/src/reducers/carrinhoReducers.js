import { CARRINHO_ADD_ITEM, CARRINHO_DELETE_ITEM, CARRINHO_SAVE_METODO_PAGAMENTO, CARRINHO_SAVE_SHIPPING } from "../constants/carrinhoConstants";

export const carrinhoReducer = (state = { carrinhoItens: [] }, action) => {
    switch (action.type) {
        case CARRINHO_ADD_ITEM:
            const item = action.payload;
            console.log(item);
            const existeItem = state.carrinhoItens.find(x => x.produtoTeste === item.produtoTeste);
            console.log(existeItem);
            if (existeItem) {
                console.log('achou item');
                return {
                    ...state,
                    carrinhoItens: state.carrinhoItens.map(x => x.produtoTeste === existeItem.produtoTeste ? item : x),
                };
            } else {
                console.log('não achou item');
                console.log(state.carrinhoItens);
                return { ...state, carrinhoItens: [...state.carrinhoItens, item] };
            }
        case CARRINHO_DELETE_ITEM:
            return {
                ...state,
                carrinhoItens: state.carrinhoItens.filter((x) => x.produtoTeste !== action.payload),
            };
        case CARRINHO_SAVE_SHIPPING:
            return {
                ...state,
                enderecoEntrega: action.payload
            };
        case CARRINHO_SAVE_METODO_PAGAMENTO:
            return {
                ...state,
                metodoPagamento: action.payload
            };
        default:
            return state;
    }
};