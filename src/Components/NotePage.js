import React, { Component } from 'react';
import './NotePage.css';
import AppContext from '../AppContext';

export default class Main extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes
            .filter(p => p.id === this.props.match.params.noteId)
            .map(note => {
              return (
                <section className="notes-display" key={note.id}>
                  <h3>{note.name}</h3>
                  <p>Date Modified: {note.modified}</p>
                  <button
                    onClick={() =>
                      this.context.handleDeleteFetch(note.id, true)
                    }
                    className="delete-button"
                  >
                    Delete Note
                  </button>
                  <p>{note.content}</p>
                </section>
              );
            });
        }}
      </AppContext.Consumer>
    );
  }
}
