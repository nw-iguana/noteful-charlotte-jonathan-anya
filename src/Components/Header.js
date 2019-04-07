import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return(
    <header>
      <Link to="/">
        <h1>Noteful...</h1>
        <h2>For All Your Note-Taking Needs!</h2>
      </Link>
    </header>
  )
}