import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import AppContext from '../AppContext';
import DateModified from './DateModified';
import DeleteButton from './DeleteButton';

export default class Main extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes.map((note, index) => {
            return (
              <section className="notes-display" key={index}>
                <Link to={`/notes/${note.id}`}>
                  <h3>{note.name}</h3>
                </Link>
                <DateModified note={note} />
                <DeleteButton note={note} />
              </section>
            );
          });
        }}
      </AppContext.Consumer>
    );
  }
}
