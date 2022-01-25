
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { signout } from './actions/usuarioActions';
import TelaCarrinho from './Telas/TelaCarrinho';
import TelaFinalizarPedido from './Telas/TelaFinalizarPedido';
import TelaHome from './Telas/TelaHome';
import TelaLogar from './Telas/TelaLogar';
import TelaPagamento from './Telas/TelaPagamento';
import TelaProduto from './Telas/TelaProduto';
import TelaRegistrar from './Telas/TelaResgistrar';
import TelaShipping from './Telas/TelaShipping';

function App() {
  const carrinho = useSelector(state => state.carrinho);
  const { carrinhoItens } = carrinho;
  const userSignin = useSelector((state) => state.usuarioSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const deslogar = () =>{
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">e-Commerce</Link>
          </div>
          <div>
            <Link to="/carrinho">Carrinho
              {
                carrinhoItens.length > 0 && (
                  <span className="badge">{carrinhoItens.length}</span>
                )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.nome} <i className="fa fa-caret-down">{''}</i></Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={deslogar}>Sign Out</Link>
                  </ul>
                </div>
              ) : (
                <Link to="/logar">Logar</Link>
              )
            }
          </div>
        </header>
        <main>
          <Route path="/carrinho/:id?" component={TelaCarrinho}></Route>
          <Route path="/produtos/:id" component={TelaProduto}></Route>
          <Route path="/logar" component={TelaLogar}></Route>
          <Route path="/registrar" component={TelaRegistrar}></Route>
          <Route path="/shipping" component={TelaShipping}></Route>
          <Route path="/pagamento" component={TelaPagamento}></Route>
          <Route path="/finalizar" component={TelaFinalizarPedido}></Route>
          <Route path="/" component={TelaHome} exact></Route>
        </main>
        <footer className="row center">
          Aplicação de referência TCC Iuri
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
