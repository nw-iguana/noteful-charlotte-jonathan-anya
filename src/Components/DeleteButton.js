import React, { Component } from 'react';
import AppContext from '../AppContext';
import './DeleteButton.css';

export default class DeleteButton extends Component {
  static contextType = AppContext;
  render() {
    let noteId = this.props.note.id;
    return(
        <button
          type="submit"
          className="delete-button"
          // id={noteId}
          onClick={() => this.context.handleDeleteFetch(noteId, true)}>
          Delete
        </button>
    )
  }
}