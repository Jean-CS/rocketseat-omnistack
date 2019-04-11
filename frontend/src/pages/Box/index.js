import React, { Component } from 'react';
import api from '../../services/api';

import { MdDonutLarge, MdInsertDriveFile } from 'react-icons/md';

import './styles.css';

export default class Box extends Component {
    state = { box: {} };

    async componentDidMount() {
        // Props passed down from Router
        // It is the parameter passed in the route '/boxes/:id'
        const box = this.props.match.params.id;
        const res = await api.get(`boxes/${box}`);

        this.setState({
            box: res.data,
        });
    }
    render() {
        return (
            <div id="box-container">
                <header>
                    <MdDonutLarge size={50} color="#7159c1" />
                    <h1>{this.state.box.title}</h1>
                </header>

                <ul>
                    {this.state.box.files &&
                        this.state.box.files.map(file => (
                            <li>
                                <a className="fileInfo" href={file.url} target="_blank noopener noreferer">
                                    <MdInsertDriveFile size={24} color="#A5CFFF" />
                                    <strong>{file.title}</strong>
                                </a>

                                <span>{file.createdAt}</span>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}
