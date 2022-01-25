import { startSession } from 'mongoose';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/carrinhoActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function TelaShipping(props) {
    
    const userLogado = useSelector(state => state.usuarioSignin);
    const { userInfo } = userLogado;

    const carrinho = useSelector(state => state.carrinho);
    const { enderecoEntrega } = carrinho;

    if (!userInfo) {
        props.history.push('/logar');
    }

    const [nomeCompleto, setNomeCompleto] = useState(enderecoEntrega.nomeCompleto);
    const [endereco, setEndereco] = useState(enderecoEntrega.endereco);
    const [cidade, setCidade] = useState(enderecoEntrega.cidade);
    const [cep, setCep] = useState(enderecoEntrega.cep);
    const [pais, setPais] = useState(enderecoEntrega.pais);

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ nomeCompleto, endereco, cidade, cep, pais }));
        props.history.push('/pagamento');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Endereço de entrega</h1>
                </div>
                <div>
                    <label htmlFor="NomeCompleto">Nome completo</label>
                    <input type="text" id="NomeCompleto" placeholder="Insira seu nome completo"
                        valeu={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required></input>
                </div>

                <div>
                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" id="endereco" placeholder="Insira seu endereço"
                        valeu={endereco} onChange={(e) => setEndereco(e.target.value)} required></input>
                </div>

                <div>
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" id="cidade" placeholder="Insira sua cidade"
                        valeu={cidade} onChange={(e) => setCidade(e.target.value)} required></input>
                </div>

                <div>
                    <label htmlFor="cep">Cep</label>
                    <input type="text" id="cep" placeholder="Insira seu Cep"
                        valeu={cep} onChange={(e) => setCep(e.target.value)} required></input>
                </div>

                <div>
                    <label htmlFor="pais">Pais</label>
                    <input type="text" id="pais" placeholder="Insira seu pais"
                        valeu={pais} onChange={(e) => setPais(e.target.value)} required></input>
                </div>

                <div>
                    <label />
                    <button className="primary" type="submit">Continuar</button>
                </div>
            </form>
        </div>
    );
}
