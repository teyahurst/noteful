import React from 'react';

function FolderValidationError(props){
    if(props.hasError){
        return(
            <div className='error'>{props.message}</div>
        )
    }

    return <></>
}