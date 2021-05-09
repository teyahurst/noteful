import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';


class AddFolder extends React.Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    static contextType = ApiContext;


    handleSubmit = e => {
        e.preventDefault();
        const folder = {
            name: e.target['folder-name'].value
        }
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Create a Folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='folder-name-input'>
                            Name
                        </label>
                        <input type='text' id='folder-name-input' name='folder-name' required/>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>
                            Add Folder
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

export default AddFolder;