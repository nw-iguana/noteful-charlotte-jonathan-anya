import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

export default function Main(props) {
    const notes = props.notes.map((note, index) => {
        return (
            <section className="note" key={index}>
                <Link to={`/note/${note.id}`}>
                    <h3>{note.name}</h3>
                </Link>
                <p>Date Modified: {note.modified}</p>
                <button className="delete-button">Delete Note</button>
            </section>
        )
    })

    return (
        <main className="notes-display">
            {notes}
            <button>Add Note</button>
        </main>
    )
}