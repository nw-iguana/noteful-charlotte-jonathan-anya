import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateModified from './DateModified';
import DeleteButton from './DeleteButton';
import AppContext from '../AppContext';

export default class Folder extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes
            .filter(note => note.folder_id === parseInt(this.props.match.params.folder_id))
            .map(note => {
              return (
                <section className="notes-display" key={note.id}>
                  <Link to={`/notes/${note.id}`}>
                    <h3>{note.title}</h3>
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
