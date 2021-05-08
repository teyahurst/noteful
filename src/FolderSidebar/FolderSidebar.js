import React from 'react';
import './FolderSidebar.css';
import { NavLink, Link } from 'react-router-dom';
import ApiContext from '../ApiContext';



class FolderSidebar extends React.Component {
    static contextType = ApiContext;

    render() {
        const { folders } = this.context

    return (
        
        <div className='folder-container'>
            <ul className='Folders-List'>
                {folders.map(folder => 
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
}


export default FolderSidebar;