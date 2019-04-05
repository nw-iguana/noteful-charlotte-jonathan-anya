import React, { Component } from 'react';
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
      validationMessages = 'Folder name already exists.';
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
    event.preventDefault();
    this.context.handlePostFetch(event, folderName);
  }

  render() {
    return (
      <form
        className="react-form"
        onSubmit={(e, name) => this.handlePostSubmit(e, this.state.folderName)}>
        <label htmlFor="folder-name">Folder Name: </label>
        <input
          id="folder-name"
          className="folder-name"
          defaultValue="i.e. Foobar"
          onChange={(e) => this.handleFolderName(e.target.value)} />
        <button type="submit" disabled={!this.state.nameValid}>Submit</button>
        <p>{this.state.validation}</p>
      </form>
    )
  }
}