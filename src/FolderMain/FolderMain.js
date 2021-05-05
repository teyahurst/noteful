import React from 'react';
import './Folder.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';


/*comment*/

function FolderMain(props){
   
   return(
        <section className='folderMain'>
            <ul className='Folder-Notes-List'>

            <div className='FolderMain-btn-container'>
                <button 
                    tag={Link}
                    to='/add-note'
                    type='button'
                    className='FolderMain-add-note-btn'>
                        Add Note
                    </button>
                </div>
                
                {props.notes.map(note => 
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

export default FolderMain;