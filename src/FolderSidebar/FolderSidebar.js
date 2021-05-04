import React from 'react';
import './FolderSidebar.css';
import { NavLink } from 'react-router-dom';


function FolderSidebar(props){
    return (
        
        <div className='folder-container'>
            <ul className='Folders-List'>
                {props.folders.map(folder => 
                    <li key={folder.id}>
                        <NavLink to={`/folder/${folder.id}`}>
                            {folder.name}
                        </NavLink>
                    </li>)}
                
            </ul>
        </div>
    )
}

FolderSidebar.defaultProps = {
    folders: []
}

export default FolderSidebar;