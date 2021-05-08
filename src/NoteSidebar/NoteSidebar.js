import React from 'react';
import ApiContext from '../ApiContext';
import './NoteSidebar.css';
import { findFolder, findNote } from '../varhelp';

class NoteSidebar extends React.Component{
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;


    render(){
        const notes = this.context.notes
        const folders = this.context.folders
        const noteId = this.props.match.params.noteId
        const note = findNote(notes, noteId) 
        const folder = findFolder(folders, note.folderId)
        
        

    return(
     <div>
         {folder && (
             <h3 className='NoteSidebar-folder-name'>
                 {folder.name}
             </h3>
         )}
                 
                 <button className='back-btn'
                         tag='button'
                         role='link'
                         onClick={() => this.props.history.goBack()}>
                    Back
                 </button>
         
     </div>
        )
    }    
}

export default NoteSidebar;