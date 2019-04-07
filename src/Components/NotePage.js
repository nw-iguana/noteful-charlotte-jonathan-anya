import React, { Component } from 'react';
import AppContext from '../AppContext';

export default class Main extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes.filter(p => p.id === this.props.match.params.noteId)
            .map(note => {
              return (
                <section className="notes-display" key={note.id}>
                  <h3>{note.name}</h3>
                  <p><span className="date-modified">Date Modified: {note.modified}</span></p>
                  <button
                    onClick={() => this.context.handleDeleteFetch(note.id, true)}
                    className="delete-button">
                    Delete
                  </button>
                  <p>{note.content.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                </section>
              )
            })
        }}
      </AppContext.Consumer>
    );
  }
}
