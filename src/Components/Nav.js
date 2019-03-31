import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav(props) {
    console.log(props)
    const folders = props.state.folders.map((folder, index) => {
        return (
            <li key={index}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
        )
    })
    return (
        <nav className='navigation'>
            <ul>
                {folders}
            </ul>
            <button className="add-folder">Add Folder</button>
        </nav>
    )
}