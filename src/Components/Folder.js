import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';
import AppContext from '../AppContext';

export default class Folder extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes
            .filter(note => note.folderId === this.props.match.params.folderId)
            .map(note => {
              return (
                <main className="notes-display">
                  <section className="note" key={note.id}>
                    <Link to={`/note/${note.id}`}>
                      <h3>{note.name}</h3>
                    </Link>
                    <p>Date Modified: {note.modified}</p>
                    <button
                      onClick={() => this.context.handleDeleteFetch(note.id)}
                      className="delete-button"
                    >
                      Delete Note
                    </button>
                  </section>
                </main>
              );
            });
        }}
      </AppContext.Consumer>
    );
  }
}
