import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMetodoPagamento } from '../actions/carrinhoActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function TelaPagamento(props) {
    const carrinho = useSelector(state => state.carrinho);
    const { enderecoEntrega } = carrinho;
    if(!enderecoEntrega.endereco){
        props.history.push('/shipping');
    }

    const [metodoPagamento, setMetodoPagamento] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveMetodoPagamento (metodoPagamento));
        props.history.push('/finalizar');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Método de pagamento</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="metodoPagamento"
                            required checked onChange={(e) => setMetodoPagamento(e.target.value)}></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="dinheiro" value="Dinheiro" name="metodoPagamento"
                            required onChange={(e) => setMetodoPagamento(e.target.value)}></input>
                        <label htmlFor="dinheiro">Dinheiro</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Confirmar</button>
                </div>
            </form>
        </div>
    )
};