import React from 'react';
import Note from '../Note/Note';
import './NoteMain.css';

function NoteMain(props){
    return (
        <div className='NoteContent'>
            <Note 
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
            />
            <div className='NotePageMain__content'>
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
                )}
            </div>
        </div>
            
    )
}

export default NoteMain;