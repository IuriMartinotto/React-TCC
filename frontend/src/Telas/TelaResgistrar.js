import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, signin } from '../actions/usuarioActions';
import BoxCarregando from '../components/BoxCarregando';
import BoxMensagem from '../components/BoxMensagem';

export default function TelaRegistrar(props) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [confirmPassword, setConfirmarSenha] = useState('');

    const redirecionar = props.location.search ? props.location.search.split('=')[1] :
        '/';

    const userRegister = useSelector((state) => state.usuarioRegister);
    const { userInfo, carrengando, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Senhas não conferem!')
        } else {
            dispatch(register(nome, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirecionar);
        }
    }, [userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Criar nova contra</h1>
                </div>
                {carrengando && <BoxCarregando></BoxCarregando>}
                {error && <BoxMensagem variant="danger">{error}</BoxMensagem>}

                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Informar seu nome" required
                        onChange={e => setNome(e.target.value)}></input>
                </div>

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
                    <label htmlFor="ConfirmarSenha">Confirmar senha</label>
                    <input type="password" id="ConfirmarSenha" placeholder="Confirmar sua senha" required
                        onChange={e => setConfirmarSenha(e.target.value)}></input>
                </div>

                <div>
                    <label></label>
                    <button className="primary" type="submit">Registrar</button>
                </div>

                <div>
                    <label></label>
                    <div>
                        Já tem uma conta? {''}
                        <Link to={`/logar?redirecionar=${redirecionar}`}>Logar</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}