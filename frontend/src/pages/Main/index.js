import React, { Component } from 'react';
import api from '../../services/api';

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

        console.log(res.data);
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
                    <i className="fas fa-magnet " />
                    <input placeholder="Criar um box" value={this.state.newBox} onChange={this.handleInputChange} />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
