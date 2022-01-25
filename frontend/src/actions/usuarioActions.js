import { USUARIO_REGISTER_FAIL, USUARIO_REGISTER_REQUEST, USUARIO_REGISTER_SUCESS, USUARIO_SIGNIN_FAIL, USUARIO_SIGNIN_REQUEST, USUARIO_SIGNIN_SUCESS, USUARIO_SIGNOUT } from "../constants/usuarioConstants"
import Axios from 'axios';

export const signin = (email, senha) => async (dispatch) => {
    dispatch({ type: USUARIO_SIGNIN_REQUEST, payload: { email, senha } });
    try {
        const { data } = await Axios.post('/api/users/logar', { email, senha });
        dispatch({ type: USUARIO_SIGNIN_SUCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USUARIO_SIGNIN_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};

export const register = (nome, email, senha) => async (dispatch) => {
    dispatch({ type: USUARIO_REGISTER_REQUEST, payload: { email, senha } });
    try {
        const { data } = await Axios.post('/api/users/registrar', { nome, email, senha });
        dispatch({ type: USUARIO_REGISTER_SUCESS, payload: data });
        dispatch({ type: USUARIO_SIGNIN_SUCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USUARIO_REGISTER_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};


export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('carrinhoItens');
    localStorage.removeItem('enderecoEntrega');
    dispatch({ type: USUARIO_SIGNOUT });
};