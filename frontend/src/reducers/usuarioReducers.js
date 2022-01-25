import { USUARIO_REGISTER_FAIL, USUARIO_REGISTER_REQUEST, USUARIO_REGISTER_SUCESS, USUARIO_SIGNIN_FAIL, USUARIO_SIGNIN_REQUEST, USUARIO_SIGNIN_SUCESS, USUARIO_SIGNOUT } from "../constants/usuarioConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USUARIO_SIGNIN_REQUEST:
            return { carregando: true };
        case USUARIO_SIGNIN_SUCESS:
            return { carregando: false, userInfo: action.payload };
        case USUARIO_SIGNIN_FAIL:
            return { carregando: false, error: action.payload };
        case USUARIO_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USUARIO_REGISTER_REQUEST:
            return { carregando: true };
        case USUARIO_REGISTER_SUCESS:
            return { carregando: false, userInfo: action.payload };
        case USUARIO_REGISTER_FAIL:
            return { carregando: false, error: action.payload };
        default:
            return state;
    }
};