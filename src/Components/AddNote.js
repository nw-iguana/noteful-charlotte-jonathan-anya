import React, { Component } from 'react';
import AppContext from '../AppContext';

export default class AddNote extends Component {
  static contextType = AppContext;

  state = {
    name: '',
    folderId: '',
    content: '',
    nameValid: false,
    contentValid: false,
    nameValidation: '',
    contentValidation: ''
  }

  handlePostSubmit(event, note) {
    event.preventDefault();
    this.context.handlePostNote(event, note);
  }

  handleNoteTitle = (title) => {
    this.setState({ name: title }, this.validateTitle(title))
  }

  handleNoteContent = (content) => {
    this.setState({ content }, this.validateContent(content))
  }

  handleFolderId = (folderId) => {
    this.setState({ folderId })
  }

  validateTitle(title) {
    let validationMessages = this.state.nameValidation;
    let hasError = false;

    if (title.length === 0) {
      hasError = true;
      validationMessages = 'Title cannot be blank.'
    }
    
    else {
      validationMessages = '';
    }

    this.setState({
      nameValid: !hasError,
      nameValidation: validationMessages,
    }, this.titleValid(title));
  }

  validateContent(content) {
    let validationMessages = this.state.contentValidation;
    let hasError = false;

    if (content.length === 0) {
      hasError = true;
      validationMessages = 'Note cannot be blank.'
    }
    
    else {
      validationMessages = '';
    }

    this.setState({
      contentValid: !hasError,
      contentValidation: validationMessages,
    }, this.contentValid(content));
  }

  titleValid(title) {
    if (this.state.name) {
      this.setState({name: title})
    }
  }

  contentValid(content) {
    if (this.state.content) {
      this.setState({content})
    }
  }

  render() {
    let folderList = this.context.folders.map(folder => {
      return folder.name
    });

    let folderIds = this.context.folders.map(folder => {
      return folder.id
    });

    return (
      <main className="notes-display">
        <form
          className="react-form"
          onSubmit={(e, name) => this.handlePostSubmit(e, this.state)}>
          <label htmlFor="note-title">Title: </label>
          <input
            type="text"
            id="note-title"
            name="note-title"
            className="note-title"
            aria-label="Input for new note title"
            aria-required="true"
            aria-describedby="error-box"
            onChange={e => this.handleNoteTitle(e.target.value)} />
          <label htmlFor="note-content">Content: </label>
          <textarea
            rows="10"
            cols="90"
            id="note-content"
            name="note-content"
            className="note-content"
            aria-label="Input for content of new note"
            aria-required="true"
            aria-describedby="error-box"
            onChange={e => this.handleNoteContent(e.target.value)} />
          <label htmlFor="note-folder">Folder: </label>
          <select
            id="note-folder"
            className="note-folder"
            aria-label="Select Folder from Options"
            aria-required="true"
            aria-describedby="error-box"
            onChange={e => this.handleFolderId(e.target.value)}>
            {folderList.map((name, id) => {
              return <option key={folderIds[id]} value={folderIds[id]}>{name}</option>
            })}
          </select>
          <button
            className="submit-button"
            type="submit"
            disabled={!this.state.nameValid || !this.state.contentValid}>
            Submit
          </button>
          <section className="error-box" id="error-box" aria-live="assertive">
            {this.state.nameValidation} 
            {this.state.contentValidation}
          </section>
        </form>
      </main>
    )
  }
}