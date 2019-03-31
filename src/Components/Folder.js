import React from 'react';
import { Link } from 'react-router-dom';
import './Folder.css'

export default function Folder(props) {
    let notes = props.props.notes;
    const noteFolder = notes.filter(note => note.folderId === props.match.params.folderId)
    const filteredNotes = noteFolder.map(note =>{ 
        return (
            <section className="note" key={note.id}>
                <Link to={`/note/${note.id}`} >
                    <h3>{note.name}</h3>
                </Link>
                <p>Date Modified: {note.modified}</p>
                <button className="delete-button">Delete Note</button>
            </section>
        )
    })

    return (
        <main className="notes-display">
           {filteredNotes}
        </main>
    )
}