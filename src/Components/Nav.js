import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import AppContext from '../AppContext';

export default function Nav() {
    return (
        <AppContext.Consumer>
            {({ folders }) => {
                return (
                <nav className='navigation'>
                    <ul>
                        {folders.map((folder, index) => {
                            return (
                                <li key={index}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
                            )
                        })}
                    </ul>
                    <button className="add-folder">Add Folder</button>
                </nav>
                )
            }}
        </AppContext.Consumer>
    )
}