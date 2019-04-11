import React, { Component } from 'react';

import './styles.css';

export default class Main extends Component {
    render() {
        return (
            <div id="main-container">
                <form action="">
                    <i class="fas fa-magnet " />
                    <input placeholder="Criar um box" />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
