import React, { Component } from 'react';
import AppContext from '../AppContext';
import DateModified from './DateModified';
import DeleteButton from './DeleteButton';

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
                  <DateModified note={note} />
                  <DeleteButton note={note} />
                  {note.content.split('\n \r').map((para, index) => <p key={index}>{para}</p>)}
                </section>
              )
            })
        }}
      </AppContext.Consumer>
    );
  }
}
