import React, { Component } from 'react';
import './DateModified.css';
import PropTypes from 'prop-types';

export default class DateModified extends Component {
  render() {
    let date = this.props.note.date_modified
    return (
      <p>
        <span className="date-modified">Date Modified: {date.substring(0, 10)}</span>
      </p>
    )
  }
}

DateModified.propTypes = {
  note: PropTypes.object
};