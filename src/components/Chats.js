import React, { useState, useEffect, useContext, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { auth, db } from '../firebase'
import AppContext from '../AppContext'

import * as api from '../api/index'

import ChatButton from './auxiliary/ChatButton'
import SelectUser from './auxiliary/SelectUser'

import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_CHAT, HIDE, RECIEVED, VALUE } from '../config/index'


const Chats = ({ innerWidth }) => {
  const dispatch = useDispatch()
  const currentChat = useSelector(state => state.chat)

  const [chats, setChats] = useState([])
  const [found, setFound] = useState([])
  const { user } = useContext(AppContext)

  const inputRef = useRef(null)

  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase()
    if (!query.length) {
      setFound([])
      return
    }

    setFound(await api.runSearch(query))
  }


  const handleSignOut = async () => {
    dispatch({ type: REMOVE_CHAT })
    dispatch({ type: HIDE })
    await auth.signOut()
  }


  useEffect(() => {
    let chatsRef, chatsListener, cleanupFunction = false

    const fetchChats = async () => {
      chatsRef = await db.ref(RECIEVED).child(user)
      chatsListener = chatsRef.on(VALUE, sn => {
        const fetched = []
        for (let key in sn.val()) {
          const { email, userName, text, profileImage, unread } = sn.val()[key]
          fetched.push({ email, userName, text, profileImage, unread })
        }

        setChats(fetched)
      })
    }

    fetchChats()

    return () => {
      chatsRef && chatsRef.off(VALUE, chatsListener)
      cleanupFunction = true
    }
  }, [])


  return(
    <div className="chats">
      <div className="navigation">
        <b>Chats</b>
        <button onClick={ handleSignOut }>
          <FontAwesomeIcon icon={ faSignOutAlt } /> Sign Out
        </button>
      </div>
      <input ref={ inputRef } onChange={ handleSearch } placeholder="Search People" type="text" />

      <div className="list">
        {
          found.length ?
            found.map(({ email, userName, profileImage }) =>
              <SelectUser
                setFound={ setFound }
                inputRef={ inputRef }
                email={ email }
                userName={ userName }
                profileImage={ profileImage }
              />
            )
          :
            chats.map(({ userName, text, profileImage, unread, email }) => {
              return(
                <ChatButton
                  innerWidth={ innerWidth }
                  email={ email }
                  userName={ userName }
                  text={ text }
                  profileImage={ profileImage }
                  unread={ unread }
                />
              )
            })
        }
      </div>
    </div>
  )
}

export default Chats
