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
              <section className="notes-display" key={index}>
                <Link to={`/note/${note.id}`}>
                  <h3>{note.name}</h3>
                </Link>
                <p><span className="date-modified">Date Modified: {note.modified}</span></p>
                <button
                  onClick={() => this.context.handleDeleteFetch(note.id)}
                  className="delete-button">
                  Delete
                </button>
              </section>
            );
          });
        }}
      </AppContext.Consumer>
    );
  }
}
