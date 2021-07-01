import React from 'react';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import './NoteMain.css';
import { findNote } from '../varhelp';
import PropTypes from 'prop-types';

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
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || { content: '' }
        
      

        return (
        <div className='NoteContent'>
            <Note 
                id={note.id}
                name={note.note_name}
                modified={note.modified}
                onDeleteNote={this.handleDeleteNote}
                
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

NoteMain.propTypes = {
    match: PropTypes.object,
}

export default NoteMain;