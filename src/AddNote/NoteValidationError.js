import React from 'react';

function NoteValidationError(props){
    if(props.hasError){
        return (
            <div className='error'>{props.message}</div>
        )
    }

    return <></>
}

export default NoteValidationError;