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
            .filter(note => note.folderId === this.props.match.params.folderId)
            .map(note => {
              return (
                <section className="notes-display" key={note.id}>
                  <Link to={`/note/${note.id}`}>
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
