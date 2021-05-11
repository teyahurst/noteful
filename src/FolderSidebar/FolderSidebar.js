import React from 'react';
import './FolderSidebar.css';
import { NavLink, Link } from 'react-router-dom';
import ApiContext from '../ApiContext';




class FolderSidebar extends React.Component {
    static contextType = ApiContext;

    render() {
        const { folders=[] } = this.context

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
                    </li>
                )}
                <Link to='/add-folder'>
                        <button 
                            type='button'
                            className='FolderSidebar-add-folder-btn'>
                            +
                        </button>
                    </Link>
            </ul>

            
                
            </div>
        
        )
    }                
}



export default FolderSidebar;