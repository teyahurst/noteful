import React from 'react';
import './Folder.css';
import Note from '../Note/Note';


/*comment*/

function FolderMain(props){
   
   return(
        <div className='folderMain'>
            <ul className='Folder-Notes-List'>
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
        </div>
   )
}

export default FolderMain;