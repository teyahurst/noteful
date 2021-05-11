import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';




class Note extends React.Component{
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if(!response.ok)
        return response.json().then(e => Promise.reject(e))
      return response.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error })
    })
  }




  render() {
    const { name, id, modified } = this.props
    const date = new Date(modified).toDateString();
    return (
        <div className = 'Note'>
            <h2 className='Note-title'>
                <Link to={`/note/${id}`}>
                    {name}
                </Link>
                
            </h2>

        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified: {' '}
                {date}
                <br/>
                <button className='Note-delete'
                    type='button'
                    onClick={this.handleClickDelete}
              >
              Delete
            </button>
              
          

          
            </div>
        </div>
    </div>
    )
  }
}

Note.propTypes = {
  modified: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onDeleteNote: PropTypes.func,
};

export default Note;