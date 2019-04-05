import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import AppContext from '../AppContext';

export default class Main extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes.map((note, index) => {
            return (
              <main className="notes-display" key={index}>
                <section className="note">
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
                  <button>Add Note</button>
                </section>
              </main>
            );
          });
        }}
      </AppContext.Consumer>
    );
  }
}
