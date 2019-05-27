import React, { Component } from 'react';
import './FormStyles.css';
import AppContext from '../AppContext';

export default class AddNote extends Component {
  static contextType = AppContext;

  state = {
    title: '',
    folder_id: '',
    content: '',
    titleValid: false,
    contentValid: false,
    titleValidation: '',
    contentValidation: ''
  }

  handlePostSubmit = () => {
    this.context.handlePostNote(this.state);
  }

  handleNoteTitle = (e) => {
    let titleInput = e.target.value;

    this.setState({ title: titleInput }, this.validateTitle(titleInput))
  }

  handleNoteContent = (e) => {
    let contentInput = e.target.value;
    this.setState({ content: contentInput }, this.validateContent(contentInput))
  }

  handleFolderId = (e) => {
    let folder_id = e.target.value;
    this.setState({ folder_id })
  }

  validateTitle(title) {
    let validationMessages = this.state.titleValidation;
    let hasError = false;

    if (title.length === 0) {
      hasError = true;
      validationMessages = ' Title cannot be blank. '
    }
    
    else {
      validationMessages = '';
    }

    this.setState({
      titleValid: !hasError,
      titleValidation: validationMessages,
    }, this.titleValid(title));
  }

  validateContent(content) {
    let validationMessages = this.state.contentValidation;
    let hasError = false;

    if (content.length === 0) {
      hasError = true;
      validationMessages = ' Note cannot be blank. '
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
    if (this.state.title) {
      this.setState({title: title})
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
          onSubmit={this.handlePostSubmit}>
          <label htmlFor="note-title">Title: </label>
          <input
            type="text"
            id="note-title"
            name="note-title"
            className="note-title"
            aria-label="Input for new note title"
            aria-required="true"
            aria-describedby="error-box"
            onChange={this.handleNoteTitle} />
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
            onChange={this.handleNoteContent} />
          <label htmlFor="note-folder">Folder: </label>
          <select
            id="note-folder"
            className="note-folder"
            aria-label="Select Folder from Options"
            aria-required="true"
            aria-describedby="error-box"
            onChange={this.handleFolderId}>
            {<option key="0" value="0">Please select a folder...</option>}
            {folderList.map((name, id) => {
              return <option key={folderIds[id]} value={folderIds[id]}>{name}</option>
            })}
          </select>
          <button
            className="submit-button"
            type="submit"
            disabled={!this.state.titleValid || !this.state.contentValid}>
            Submit
          </button>
          <section className="error-box" id="error-box" aria-live="assertive">
            {this.state.titleValidation} 
            {this.state.contentValidation}
          </section>
        </form>
      </main>
    )
  }
}