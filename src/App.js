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
  alert(user.username)
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
      <div className='modal' style={{display: showCreateModal === false && 'none'}}>
        <NoteCreateForm 
          onSuccess={() => {setShowCreateModal(false)}}
          onCancel={() => {setShowCreateModal(false)}}
          onError={(error) => {console.log(error)}}
         />
      </div>     
      <div className='modal' style={{display: showUpdateModal === false && 'none'}}>
        <NoteUpdateForm 
          note={updateNote}
          onSuccess={() => {setShowUpdateModal(false)}}
          onSubmit={(fields) => {
            const updatedFields = {}
            Object.keys(fields).forEach(key => {
                if (typeof fields[key] === 'string') {
                    updatedFields[key] = fields[key].trim()
                } else {
                    updatedFields[key] = fields[key]
                }
            })
            return updatedFields
          }}
          onCancel={() => setShowUpdateModal(false)}
          onError={(error) => {console.log(error)}}
        />
      </div>   
    </>
  );
}

export default withAuthenticator(App, withAuthenticatorOptions);