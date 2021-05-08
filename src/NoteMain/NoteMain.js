import React from 'react';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import './NoteMain.css';
import { findNote } from '../varhelp';

class NoteMain extends React.Component{
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const notes  = this.context.notes
        const noteId = this.props.match.params
        const note = findNote(notes, noteId.noteId)
        
      

        return (
        <div className='NoteContent'>
            <Note 
                id={note.id}
                name={note.name}
                modified={note.modified}
            />
            <div className='NotePageMain__content'>
                {note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
                )}
            </div>      
        </div>
            
        )
    }
}

export default NoteMain;