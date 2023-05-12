import './App.css';
import { CreateNote, NavBar, NoteUICollection, UpdateNote, NoteCreateForm } from './ui-components';
import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify'; 

const withAuthenticatorOptions = {
  hideSignUp: true
}

function App({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateNote, setUpdateNote] = useState()
  
  return (
    <>
      <NavBar 
        width="100%" 
        marginBottom='20px'
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true)},
          Button31632487: {
            onClick: async () => {
              await DataStore.clear()
              signOut()
            }}
        }}
        />
      <div className='container'>
        <NoteCreateForm />
      </div> 
      <div className='container'>
      <NoteUICollection overrideItems={({ item, idx }) => {
        return {
          overrides: {
            Vector31472745: {
              
              onClick: () => {
                setShowUpdateModal(true)
                setUpdateNote(item)
              }
            }
          }
        }
      }}
      />
      </div>
      {/* // TODO - Form needs to hide after submit
      // TODO - User needs a notifcation that the submit was successful.
    // TODO - Form needs to be cleared of data on launch.  
    // TODO - Private Authorization doesn't work correctly.
    */ }
      <div className='modal' style={{display: showCreateModal === false && 'none'}}>
        <CreateNote 
          onSuccess={() => {
            setShowCreateModal(false)
          }}
          overrides={{
            MyIcon: {
              as: 'button',
              onClick: () => setShowCreateModal(false)
            }
          }}
        />
      </div>
      <div className='modal' style={{display: showUpdateModal === false && 'none'}}>
        <UpdateNote 
          note={updateNote} 
          overrides={{
            MyIcon: {
              as: 'button',
              onClick: () => setShowUpdateModal(false)
            }
          }}
        />
      </div>   
    </>
  );
}

export default withAuthenticator(App, withAuthenticatorOptions);
