import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return(
    <header>
      <NavLink to="/">
        <h1>Noteful...</h1>
        <h2>For All Your Note-Taking Needs!</h2>
      </NavLink>
    </header>
  )
}