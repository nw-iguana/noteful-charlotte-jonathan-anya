import React, { Component } from 'react';
import './DateModified.css';
import PropTypes from 'prop-types';

export default class DateModified extends Component {
  render() {
    return (
      <p>
        <span className="date-modified">Date Modified: {this.props.note.modified}</span>
      </p>
    )
  }
}

DateModified.propTypes = {
  note: PropTypes.object
};