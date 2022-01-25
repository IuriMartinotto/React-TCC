import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function BoxCarregando(){
    return(
        <div className="loading">
            <i className="fa fa-spinner fa-spin"></i> Carregando...
        </div>
    )
}