import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';




function Note(props) {
    return (
        <div className = 'Note'>
            <h2 className='Note-title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>

        <button className='Note-delete'>
              remove
        </button>
        
        <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {props.modified}
          </span>
        </div>
      </div>
    </div>
    )
}

export default Note;

