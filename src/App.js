import React from 'react';
import './App.css';

import Header from './Header';
import FolderMain from './FolderMain/FolderMain';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import NoteMain from './NoteMain/NoteMain';
import NoteSidebar from './NoteSidebar/NoteSidebar';

import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

import { Route } from 'react-router-dom';
import ApiContext from './ApiContext';

import ErrorMessage from './ErrorBoundaries/ErrorMessage';



class App extends React.Component{
  state = {
      notes: [],
      folders: []
    }
  

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
    .then(([notesResponse, foldersResponse]) => {
      if(!notesResponse.ok)
        return notesResponse.json().then(e => Promise.reject(e));
      if(!foldersResponse.ok)
        return foldersResponse.json().then(e => Promise.reject(e));

      return Promise.all([notesResponse.json(), foldersResponse.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({notes, folders});
    })
    .catch(err => {
      console.error({err})
    });
  }

  handleAddfolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
};

  renderNav(){
    
    return(
      <div>
        <ErrorMessage>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact key={path}
            path={path}
            component={FolderSidebar}
          />
        ))}
        <Route path='/note/:noteId' component={NoteSidebar}/>
        <Route path='/add-folder' component={AddFolder}/>
        <Route path='/add-note' component={AddNote}/>
        </ErrorMessage>
      </div>
    );
  }


  renderMain() {
    
    return(
      <div>
        <ErrorMessage>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact key={path}
            path={path}
            component={FolderMain}
          />
        ))}

        <Route path='/note/:noteId' component={NoteMain}/>

        </ErrorMessage>
      </div>
    )
  }

  render(){
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddfolder,
      addNote: this.handleAddNote,
    }

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          
            <Header />
            <div className='group'>
            <nav className='App-Nav'>
              {this.renderNav()}
            </nav>
              <main className='App-Main'>
                {this.renderMain()}
              </main>
            </div>
            
          </div>
      </ApiContext.Provider>
    )
  }
}

export default App;