import React from 'react'

export default function Avaliacao(props) {
    const { avaliacao, numAvaliacoes } = props;
    return (
        <div className="rating">
            <span> <i className={ avaliacao >= 1 ? "fa fa-star": avaliacao >= 0.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={ avaliacao >= 2 ? "fa fa-star": avaliacao >= 1.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={ avaliacao >= 3 ? "fa fa-star": avaliacao >= 2.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={ avaliacao >= 4 ? "fa fa-star": avaliacao >= 3.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={ avaliacao >= 5 ? "fa fa-star": avaliacao >= 4.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span>{numAvaliacoes + ' avaliações'}</span>
        </div>
    )
}