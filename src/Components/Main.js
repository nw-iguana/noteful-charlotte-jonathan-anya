import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import AppContext from '../AppContext';

export default function Main() {
    return (
        <AppContext.Consumer>
            {({ notes }) => notes.map((note, index) => {
                return (
                    <main className="notes-display" key={index}>
                        <section className="note">
                            <Link to={`/note/${note.id}`}>
                                <h3>{note.name}</h3>
                            </Link>
                            <p>Date Modified: {note.modified}</p>
                            <button className="delete-button">Delete Note</button>
                        </section>
                        <button>Add Note</button>
                    </main>
                )
            })}
        </AppContext.Consumer>
    )
}