import React from 'react'

export const Paginacao = ({produtosPagina, totalProdutos, paginate}) => {
    const numeroPaginas = [];

    for(let i = 1; i <= Math.ceil(totalProdutos / produtosPagina); i++){
        numeroPaginas.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {
                    numeroPaginas.map(numero => (
                        <li key={numero} className="page-item">
                            <a onClick={() => paginate(numero)} href="!#" className="page-link">
                                {numero}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
