import React from 'react';
import './DateModified.css';

export default function DateModified(props) {
  let note = props.note;
  return (
    <p>
      <span className="date-modified">Date Modified: {note.modified}</span>
    </p>
  )
}