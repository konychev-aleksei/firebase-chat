import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import AppContext from './AppContext'
import * as api from './api/index'

import Chat from './components/Chat'
import Chats from './components/Chats'
import SignIn from './components/SignIn'

import './styles/design.css'
import './styles/layout.css'

import { Provider } from 'react-redux'
import { store } from './reducers/index'

import { useSelector } from 'react-redux'


const useWindowInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return innerWidth
}


const App = () => {
  const [user] = useAuthState(auth)


  useEffect(() => {
    const createAccount = async () => {
      if (user) {
        await api.createAccount(user?.displayName, user?.email?.replace('@gmail.com', ''), user?.photoURL)
      }
      //await api.createAccount('Party Favor', 'partyfavortest', url)
      //await api.sendMessage('Aleksei 112358', url, 'konychevaleksei', 'Party Favor', url, 'partyfavortest', { text: 'AAAAAAAAAAAA', attachment: '' })
    }

    createAccount()
  }, [user])


  const value = {
    user: user?.email?.replace('@gmail.com', ''),
    name: user?.displayName,
    url: user?.photoURL
  }


  return(
    <AppContext.Provider value={ value }>
      <Provider store={ store }>
        {
          user ?
          <Messenger />
          :
          <SignIn />
        }
      </Provider>
    </AppContext.Provider>
  )
}

const Messenger = () => {
  const innerWidth = useWindowInnerWidth()
  const showChat = useSelector(state => state.show)

  return(
    <div className="main">
      {
        innerWidth >= 800 || !showChat ?
        <Chats innerWidth={ innerWidth } />
        : null
      }
      {
        innerWidth >= 800 || showChat ?
        <Chat/>
        : null
      }
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))
