import React from 'react';
import { Link } from 'react-router-dom';

export default function Folder(props) {
    let notes = props.props.notes;
    const noteFolder = notes.filter(note => note.folderId === 'b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1')
    const filteredNotes = noteFolder.map(note =>{ 
        return (
            <section className="note">
                <Link to={`/note/${note.id}`}><h3>{note.name}</h3></Link>
                <p>Date Modified: {note.modified}</p>
                <button className="delete-button">Delete Note</button>
            </section>
        )
    })

    return (
        <>
           {filteredNotes}
        </>
    )
}