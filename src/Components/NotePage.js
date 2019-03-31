import React from 'react';
import './NotePage.css'

function NotePage(props) {
    let notes = props.props.notes;
    // console.log('props.props.notes is', props.props.notes);
    const note = notes.find(p => p.id === props.match.params.noteId)

    return (
        <section className="notes-display">
            <h3>{note.name}</h3>
            <p>Date Modified: {note.modified}</p>
            <button className="delete-button">Delete Note</button>
            <p>{note.content}</p>
        </section>
    )
}

export default NotePage;