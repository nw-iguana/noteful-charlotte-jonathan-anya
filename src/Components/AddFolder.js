import React, { Component } from 'react';
import './FormStyles.css';
import AppContext from '../AppContext';

export default class AddFolder extends Component {
  static contextType = AppContext;

  state = {
    folderName: '',
    nameValid: false,
    validation: ''
  }

  handleFolderName = (name) => {
    this.setState({ folderName: name }, this.validateFolder(name))
  }

  validateFolder(name) {
    let validationMessages = this.state.validation;
    let hasError = false;

    const checkFolderNames = this.context.folders.filter(folderName => name === folderName.name);

    if (name.length === 0) {
      hasError = true;
      validationMessages = 'Please enter a folder name.';
    }

    if (checkFolderNames.length !== 0) {
      hasError = true;
      validationMessages = 'Oops! Folder name already exists.';
    }

    else {
      validationMessages = '';
    }

    this.setState({
      nameValid: !hasError,
      validation: validationMessages,
    }, this.formValid(name));
  }

  formValid(name) {
    if (this.state.folderNameValid) {
      this.setState({folderName: name})
    }
  }

  handlePostSubmit(event, folderName) {
    this.context.handlePostFolder(event, folderName);
    console.log(this.state.folderName);
  }

  render() {
    return (
      <main className="notes-display">
        <form
          className="react-form"
          onSubmit={e => this.handlePostSubmit(e, this.state.folderName)}>
          <label htmlFor="folder-name">Folder Name: </label>
          <input
            type="text"
            id="folder-name"
            name="folder-name"
            className="folder-name"
            defaultValue="i.e. Foobar"
            aria-label="Input for new folder name"
            aria-required="true"
            aria-describedby="error-box"
            onChange={e => this.handleFolderName(e.target.value)} />
          <button
            className="submit-button"
            type="submit"
            disabled={!this.state.nameValid}>
            Submit
          </button>
          <section className="error-box" id="error-box" aria-live="assertive">
            {this.state.validation}
          </section>
        </form>
      </main>
    )
  }
}