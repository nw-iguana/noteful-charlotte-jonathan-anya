import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import AppContext from '../AppContext';

export default class Main extends Component {

    handleDeleteButton = (e, id) => {
        const url = `http://localhost:9090/notes/${id}`
        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => this.props.handleDelete(responseJson));
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ notes }) => {
                    return (notes.map((note, index) => {
                        return (
                            <main className="notes-display" key={index}>
                                <section className="note">
                                    <Link to={`/note/${note.id}`}>
                                        <h3>{note.name}</h3>
                                    </Link>
                                    <p>Date Modified: {note.modified}</p>
                                    <button onClick={(e, id) => this.handleDeleteButton(e, note.id)} className="delete-button">Delete Note</button>
                                </section>
                                <button>Add Note</button>
                            </main>
                        )
                    })
                )} }
            </AppContext.Consumer>
        )
    }
}