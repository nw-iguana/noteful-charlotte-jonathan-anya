import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <header>
        <Fragment>
            <Link to="/">
                <h1>Noteful</h1>
            </Link>
          </Fragment>
        </header>
    )
}