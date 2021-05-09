import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import './AddFolder.css';







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
            name: e.target['folder-name'].value
        }

        fetch(`http://localhost:9090/folders`, {
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
            console.log('ts', this.context)
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error => {
            console.error('add folder ', { error })
        })

        
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

export default AddFolder;