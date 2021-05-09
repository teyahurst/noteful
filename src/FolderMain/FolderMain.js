import React from 'react';
import './Folder.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../varhelp';




class FolderMain extends React.Component{
    
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)

    return(
        <section className='folderMain'>
            <div className='FolderMain-btn-container'>
                    <button 
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='FolderMain-add-note-btn'>
                            Add Note
                        </button>
                    </div>

            <ul className='Folder-Notes-List'>

                {notesForFolder.map(note => 
                    <li key={note.id}>
                        <Note 
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                            />
                    </li>
                    )}
                    
            </ul>
            
        </section>
        )
    }                
}

export default FolderMain;