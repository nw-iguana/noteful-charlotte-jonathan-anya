import React, { Component } from 'react';
import AppContext from '../AppContext';
import './DeleteButton.css';

export default class DeleteButton extends Component {
  static contextType = AppContext;
  render() {
    let note = this.props.note;
    return(
      <button
        className="delete-button"
        onClick={() => this.context.handleDeleteFetch(note.id, true)}>
        Delete
      </button>
    )
  }
}