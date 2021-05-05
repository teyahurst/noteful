import React from 'react';
import './App.css';

import Header from './Header';
import FolderMain from './FolderMain/FolderMain';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import Store from './dummyStore';
import NoteMain from './NoteMain/NoteMain';
import NoteSidebar from './NoteSidebar/NoteSidebar';

import { Route } from 'react-router-dom';


const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
  ? notes
  : notes.filter(note => note.folderId === folderId)
)





class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount(){
    this.setState(Store)
  }

  renderNav(){
    const { notes, folders } = this.state;
    return(
      <div>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact key={path}
            path={path}
            render={routeProps => (
              <FolderSidebar 
                folders={folders}
                notes={notes}
                {...routeProps}
              />
              )}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            
            
            const findNote = (notes=[], noteId) => notes.find(note => note.id === noteId);
            const findFolder = (folders=[], folderId) => folders.find(folder => folder.id === folderId);
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            
            return <NoteSidebar {...routeProps} folder={folder}/>
            }}
          />
      </div>
    )
  }


  renderMain(){
    const { notes } = this.state;
    return(
      <div>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              return (
                <FolderMain 
                  notes={getNotesForFolder(notes, folderId)}
                  />
              )
            }}
          />
        ))}

        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const findNote = (notes=[], noteId) => notes.find(note => note.id === noteId);
            return <NoteMain {...routeProps} note={findNote(notes, noteId)}/>
            
          }}
        />

        <Route path='/add-folder' component={NoteSidebar}/>
        <Route path='/add-note' component={NoteSidebar}/>
      </div>
    )
  }

  render(){
    return (
      <div className='App'>
        <Header />
        <nav className='App-Nav'>
          {this.renderNav()}
        </nav>
        <div className='App-Main'>
          <main>
            {this.renderMain()}
          </main>
          
        </div>
      </div>
    )
  }
}

export default App;
