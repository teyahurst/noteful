import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import './AddNote.css';
import NoteValidationError from './NoteValidationError';


class AddNote extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            nameValid: false,
            name: '',
            validationMessages: {
                name: '',
            }
        }
    }

    static defaultProps = {
        history: {
            push: () => { }
        },
    }

    static contextType = ApiContext;

    validateName(fieldValue){
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            fieldErrors.name='Name is Required';
            hasError = true;
        }
        this.setState({
            validationMessages: fieldErrors,
            nameValid: !hasError
        }, this.formValid);
    }

    formValid(){
        this.setState({
            formValid: this.state.nameValid
        })
    }

    updateName(name){
        this.setState({name}, () => {this.validateName(name)});
    }

    handleSubmit = e => {
        e.preventDefault()

        const note = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
        }
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(response => {
            if(!response.ok)
                return response.json().then(e => Promise.reject(e))
            return response.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`./note/${note.id}`)
        })
        .catch(error => {
            console.log('add note ', { error })
        })
        .finally(alert("Note Added!") )
    }
    render(){
        const { folders=[] } = this.context
        return(
            <section className='AddNote'>
                <h2>Create a note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            Name
                        </label>
                        <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateName(e.target.value)} required/>  
                        <NoteValidationError className='validationError' hasError={this.state.name} ></NoteValidationError>                 
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select className='note-folder-select' name='note-folder-id' required>
                            <option value={null}>...</option>
                            {folders.map(folder => 
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                            Content
                        </label>
                        <textarea id='note-content-input' name='note-content'/>
                    </div>
                    
                    <div className='buttons'>
                        <button type='submit' className='add-note'> 
                            Add Note
                        </button>
                        <button className='cancel-btn'
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                            Cancel
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

export default AddNote;