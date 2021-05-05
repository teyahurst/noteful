import React from 'react';
import './FolderSidebar.css';
import { NavLink, Link } from 'react-router-dom';


function FolderSidebar(props){
    return (
        
        <div className='folder-container'>
            <ul className='Folders-List'>
                {props.folders.map(folder => 
                    <li key={folder.id}>
                        <NavLink className='FolderSidebar-folder-link'
                                 to={`/folder/${folder.id}`}
                                >
                            {folder.name}
                        </NavLink>
                    </li>)}
                
            </ul>

            <div className='FolderSidebar-btn-wrapper'>
                <button 
                    tag={Link}
                    to='/add-folder'
                    type='button'
                    className='FolderSidebar-add-folder-btn'>
                        +
                    </button>
            </div>
        </div>
    )
}

FolderSidebar.defaultProps = {
    folders: []
}

export default FolderSidebar;