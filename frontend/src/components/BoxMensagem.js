import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function BoxMensagem(props){
    return(
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )
}