import React from 'react';
import './App.css';

import Header from './Header';
import FolderMain from './FolderMain/FolderMain';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import NoteMain from './NoteMain/NoteMain';
import NoteSidebar from './NoteSidebar/NoteSidebar';

import { Route } from 'react-router-dom';
import ApiContext from './ApiContext';





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

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
};

  renderNav(){
    
    return(
      <div>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact key={path}
            path={path}
            component={FolderSidebar}
          />
        ))}
        <Route path='/note/:noteId' component={NoteSidebar}/>
        <Route path='/add-folder' component={NoteSidebar}/>
        <Route path='/add-note' component={NoteSidebar}/>
      </div>
    );
  }


  renderMain() {
    
    return(
      <div>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact key={path}
            path={path}
            component={FolderMain}
          />
        ))}

        <Route path='/note/:noteId' component={NoteMain}/>

        
      </div>
    )
  }

  render(){
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    }

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <Header />
          <nav className='App-Nav'>
            {this.renderNav()}
          </nav>
            <main className='App-Main'>
              {this.renderMain()}
            </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App;