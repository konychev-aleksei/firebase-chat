import React from 'react'
import Wave from 'react-wavify'

import firebase from 'firebase'
import { auth } from '../firebase'


const SignIn = () => {
  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <Wave fill='#0095F6'
            className="wave"
            paused={false}
            options={{
              amplitude: 30,
              speed: 0.3,
              points: 3
            }}
      />
      <Wave fill='#0075D6'
            className="wave"
            paused={false}
            style={{ height: '300px' }}
            options={{
              amplitude: 50,
              speed: 0.3,
              points: 3
            }}
      />
      <img
        draggable="false"
        src={ 'desktop.png' }
        className="desktop"
      />
      <img
        draggable="false"
        src={ 'mobile.png' }
        className="mobile"
      />

      <div className="title">
        <h1>Firebase Chat App</h1>
        <p>
          A chat app created with React.js, Redux and Firebase
        </p>
        <button onClick={ signIn }>Sign in with Google</button>
      </div>
    </>
  )
}

export default SignIn
