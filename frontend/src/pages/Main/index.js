import React, { Component } from 'react';
import api from '../../services/api';

import { MdDonutLarge } from 'react-icons/md';

import './styles.css';

export default class Main extends Component {
    state = {
        newBox: '',
    };

    handleSubmit = async e => {
        e.preventDefault();

        const res = await api.post('boxes', {
            title: this.state.newBox,
        });

        // Props passed down from Router 'routes.js'
        this.props.history.push(`/box/${res.data._id}`);
    };

    handleInputChange = e => {
        this.setState({
            newBox: e.target.value,
        });
    };

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <MdDonutLarge size={50} color="#7159c1" />
                    <input placeholder="Criar um box" value={this.state.newBox} onChange={this.handleInputChange} />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
