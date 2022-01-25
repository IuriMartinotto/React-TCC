import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/usuarioActions';
import BoxCarregando from '../components/BoxCarregando';
import BoxMensagem from '../components/BoxMensagem';

export default function TelaLogar(props) {

    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');

    const redirecionar = props.location.search ? props.location.search.split('=')[1] :
        '/';

    const userSignin = useSelector((state) => state.usuarioSignin);
    const { userInfo, carrengando, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirecionar);
        }
    }, [userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Logar</h1>
                </div>
                {carrengando && <BoxCarregando></BoxCarregando>}
                {error && <BoxMensagem variant="danger">{error}</BoxMensagem>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Informar seu e-mail" required
                        onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" placeholder="Informar sua senha" required
                        onChange={e => setSenha(e.target.value)}></input>
                </div>

                <div>
                    <label></label>
                    <button className="primary" type="submit">Logar</button>
                </div>

                <div>
                    <label></label>
                    <div>
                        Novo usuário? {''}
                        <Link to={`/registrar?redirecionar=${redirecionar}`}>Criar nova conta</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}