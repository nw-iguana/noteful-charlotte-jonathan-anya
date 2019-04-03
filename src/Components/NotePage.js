import React from 'react';
import './NotePage.css';
import AppContext from '../AppContext';

export default function NotePage(props) {
    return (
        <AppContext.Consumer>
            {({ notes }) => {
            return (
                notes.filter(p => p.id === props.match.params.noteId)
                .map(note => {
                    return (
                    <section className="notes-display" key={note.id}>
                        <h3>{note.name}</h3>
                        <p>Date Modified: {note.modified}</p>
                        <button className="delete-button">Delete Note</button>
                        <p>{note.content}</p>
                    </section>
                    )
                })
            )
            }}
        </AppContext.Consumer>
    )
}