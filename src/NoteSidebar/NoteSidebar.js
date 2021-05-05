import React from 'react';
import './NoteSidebar.css';

function NoteSidebar(props){
    console.log(props.folder)
 return(
     <div>
         

         
             <h3 className='NoteSidebar-folder-name'>
                 {props.folder.name}
                 
                 <button className='back-btn'>
                    Back
                 </button>
             </h3>
         
             
     </div>
 )
}

export default NoteSidebar;