import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import './AddFolder.css';
import PropTypes from 'prop-types';







class AddFolder extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;


    handleSubmit = e => {
        e.preventDefault();
        const folder = {
            folder_name: e.target['folder-name'].value
        }

        fetch(`https://remembrance-parliament-57350.herokuapp.com/api/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(response => {
            if(!response.ok)
                return response.json().then(e => Promise.reject(e))
            return response.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            
        })
        .catch(error => {
            console.error('add folder ', { error })
        })
        .finally(alert("Folder Added!") )

        
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Create a Folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='folder-name-input' id='name'>
                            Name
                        </label>
                        <input type='text' className='folder-name-input' name='folder-name' required/>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='add-folder'>
                            Add Folder
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

AddFolder.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
}

export default AddFolder;