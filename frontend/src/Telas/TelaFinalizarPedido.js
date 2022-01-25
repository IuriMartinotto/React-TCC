import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function TelaFinalizarPedido(props) {

    const carrinho = useSelector(state => state.carrinho);

    if (!carrinho.metodoPagamento) {
        props.history.push('/pagamento');
    }

    const toPreco = (num) => Number(num.toFixed(2));
    carrinho.itemsPreco = toPreco(carrinho.carrinhoItens.reduce((a, c) => a + c.qtd * c.preco, 0));
    carrinho.entregaPreco = carrinho.itemsPreco > 10000 ? toPreco(0) : toPreco(50);
    carrinho.taxaPreco = toPreco(0.15 * carrinho.itemsPreco);
    carrinho.totalPreco = carrinho.itemsPreco + carrinho.entregaPreco + carrinho.taxaPreco;

    const finalizaPedidoHandler = () =>{

    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Entrega</h2>
                                <p>
                                    <strong>Nome: </strong> {carrinho.enderecoEntrega.nomeCompleto} <br></br>
                                    <strong>Endereço: </strong> {carrinho.enderecoEntrega.endereco},
                                    {carrinho.enderecoEntrega.cidade}, {carrinho.enderecoEntrega.cep},
                                    {carrinho.enderecoEntrega.pais}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Pagamento</h2>
                                <p>
                                    <strong>Método: </strong> {carrinho.metodoPagamento}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Itens do pedido</h2>
                                <ul>
                                    {carrinho.carrinhoItens.map((item) => (
                                        <li key={item.produtoTeste}>
                                            <div className="row">
                                                <div>
                                                    <img src={item.imagem} alt={item.nome} className="small"></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/prodoutos/${item.produtoTeste}`}>{item.nome}</Link>
                                                </div>
                                                <div>
                                                    {item.qtd} x R${item.preco} = R${item.qtd * item.preco}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Resumo do pedido</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Itens</div>
                                    <div>R$: {carrinho.itemsPreco.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Entrega</div>
                                    <div>R$: {carrinho.entregaPreco.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Taxa</div>
                                    <div>R$: {carrinho.taxaPreco.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total do pedido</strong></div>
                                    <div><strong>R$: {carrinho.totalPreco.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button"
                                    onClick={finalizaPedidoHandler} className="primary block"
                                    disabled={carrinho.carrinhoItens.lenght === 0}>
                                    Finalizar pedido
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}