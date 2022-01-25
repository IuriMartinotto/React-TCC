import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { carrinhoReducer } from './reducers/carrinhoReducers';
import { produtoDetalhesReducer, produtoListReducer } from './reducers/produtoReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/usuarioReducers';

const initialState = {
    usuarioSignin: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null,
    },

    carrinho: {
        carrinhoItens: localStorage.getItem('carrinhoItens') ?
            JSON.parse(localStorage.getItem('carrinhoItens')) : [],
        enderecoEntrega: localStorage.getItem('enderecoEntrega') ?
            JSON.parse(localStorage.getItem('enderecoEntrega')) : {},
        metodoPagamento: 'PayPal',
    },
};
const reducer = combineReducers({
    produtoList: produtoListReducer,
    produtoDetalhes: produtoDetalhesReducer,
    carrinho: carrinhoReducer,
    usuarioSignin: userSigninReducer,
    usuarioRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;