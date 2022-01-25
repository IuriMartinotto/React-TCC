import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removerDoCarrinhoReal } from '../actions/carrinhoActions';
import BoxMensagem from '../components/BoxMensagem';

export default function TelaCarrinho(props) {
    const produtoID = props.match.params.id;
    const qtd = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const carrinho = useSelector(state => state.carrinho);
    const { carrinhoItens } = carrinho;

    const dispatch = useDispatch();
    useEffect(() => {
        if (produtoID) {
            dispatch(addToCart(produtoID, qtd));
        }
    }, [dispatch, produtoID, qtd]);

    const removerDoCarrinho = (id) => {
        dispatch(removerDoCarrinhoReal(id));
    };

    const checkoutHandler = () => {
        props.history.push('/logar?redirect=shipping');
    };

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Carinnho de compras</h1>
                {carrinhoItens.length === 0 ? <BoxMensagem> Carrinho está vazio.
                    <Link to="/">Ir as compras</Link></BoxMensagem> :
                    <ul>
                        {carrinhoItens.map((item) => (
                            <li key={item.produtoTeste}>
                                <div className="row">
                                    <div>
                                        <img src={item.imagem} alt={item.nome} className="small"></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/prodoutos/${item.produtoTeste}`}>{item.nome}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qtd}
                                            onChange={e =>
                                                dispatch(addToCart(item.produtoTeste, Number(e.target.value)))}>
                                            {
                                                [...Array(item.temStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        R${item.preco}
                                    </div>
                                    <div>
                                        <button type="button"
                                            onClick={() => removerDoCarrinho(item.produtoTeste)}>
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Subtotal
                                ({carrinhoItens.reduce((a, c) => a + c.qtd, 0)} itens) :
                                R$ {carrinhoItens.reduce((a, c) => a + c.preco * c.qtd, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={carrinhoItens.length === 0}>
                                Prosseguir para pagamento
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}