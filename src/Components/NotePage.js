import React from 'react';

function NotePage(props) {
    let notes = props.props.notes;
    // console.log('props.props.notes is', props.props.notes);
    const note = notes.find(p => p.id === 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1')

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