import React, { Component } from 'react';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import { MdDonutLarge, MdInsertDriveFile } from 'react-icons/md';

import './styles.css';

export default class Box extends Component {
    state = { box: {} };

    async componentDidMount() {
        this.subscribeToNewFiles();

        // Props passed down from Router
        // It is the parameter passed in the route '/boxes/:id'
        const box = this.props.match.params.id;
        const res = await api.get(`boxes/${box}`);

        this.setState({
            box: res.data,
        });
    }

    // Connect Client to backend WebSocket
    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket('');

        io.emit('connectRoom', box);
        io.on('file', data => {
            this.setState({
                box: {
                    ...this.state.box,
                    files: [data, ...this.state.box.files],
                },
            });
        });
    };

    handleUpload = files => {
        const box = this.props.match.params.id;

        files.forEach(file => {
            const data = new FormData();

            data.append('file', file);

            api.post(`boxes/${box}/files`, data);
        });
    };

    render() {
        return (
            <div id="box-container">
                <header>
                    <MdDonutLarge size={50} color="#7159c1" />
                    <h1>{this.state.box.title}</h1>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />

                            <p>Arraste arquivos ou clique aqui</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    {this.state.box.files &&
                        this.state.box.files.map(file => (
                            <li key={file._id}>
                                <a className="fileInfo" href={file.url} target="_blank noopener noreferer">
                                    <MdInsertDriveFile size={24} color="#A5CFFF" />
                                    <strong>{file.title}</strong>
                                </a>

                                <span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}
