import React from 'react';
import ApiContext from '../ApiContext';
import './NoteSidebar.css';
import { findNote, findFolder } from '../varhelp';

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


    render() {
        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        
        

    return(
     <div>
         
                 
         {folder && (
             <h3 className='NoteSidebar-folder-name'>
                 {folder.name}
                 <button className='back-btn'
                         type='button'
                         onClick={() => this.props.history.goBack()}>
                    Back
                 </button> 
             </h3>
         )}
                 
                     
         
     </div>
        )
    }    
}

export default NoteSidebar;