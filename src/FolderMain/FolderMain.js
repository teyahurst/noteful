import React from 'react';
import './Folder.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../varhelp';
import PropTypes from 'prop-types';




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
            <Link to={'/add-note'}>
                <button 
                        type='button'
                        className='FolderMain-add-note-btn'>
                            Add Note
                        </button>
                        </Link>
                    </div>

            <ul className='Folder-Notes-List'>

                {notesForFolder.map(note => 
                    <li key={note.id}>
                        <Note 
                            id={note.id}
                            name={note.note_name}
                            modified={note.modified}
                            />
                    </li>
                    )}
                    
            </ul>
            
        </section>
        )
    }                
}

FolderMain.propTypes = {
    match: PropTypes.object,

}

export default FolderMain;