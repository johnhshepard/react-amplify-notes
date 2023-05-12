import './App.css';
import { NavBar, NoteUICollection, UpdateNote, NoteCreateForm, NoteUpdateForm } from './ui-components';
import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore, Auth } from 'aws-amplify'; 

const withAuthenticatorOptions = {
  hideSignUp: true
}

const checkUser = async () => {
  let user = await Auth.currentAuthenticatedUser();  
  alert(JSON.stringify(user))
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
      <button onClick={()=>checkUser()}>Who Am I</button>
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
    // TODO - Form needs to be cleared of data on launch. This happens on default forms. How can I use those in the modals?  
    */ }
      <div className='modal' style={{display: showCreateModal === false && 'none'}}>
        <NoteCreateForm onSuccess={() => {
            setShowCreateModal(false)
          }}
            overrides={{
              CancelButton: {
                onClick: () => setShowCreateModal(false)
              }
            }}
          />
      </div> 
      {/* <div className='modal' style={{display: showCreateModal === false && 'none'}}>
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
      </div>*/}
      
      <div className='modal' style={{display: showUpdateModal === false && 'none'}}>
        <NoteUpdateForm 
          note={updateNote}
          overrides={{
            CancelButton: {
              onClick: () => setShowUpdateModal(false)
            }
          }}
        />
      </div>   
    </>
  );
}

export default withAuthenticator(App, withAuthenticatorOptions);
