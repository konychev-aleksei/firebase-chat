import React, { useState, useEffect, useContext, useRef } from 'react'

import { auth, db } from '../firebase'
import AppContext from '../AppContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faGrinAlt, faPaperPlane, faTimesCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import * as api from '../api/index'

import Info from './auxiliary/Info'
import NewMessage from './auxiliary/NewMessage'
import Messages from './auxiliary/Messages'

import { useDispatch, useSelector } from 'react-redux'

import { CHATS, VALUE, SMOOTH } from '../config/index'


const Chat = () => {
  const { user, name, url } = useContext(AppContext)

  const dispatch = useDispatch()
  const currentChat = useSelector(state => state.chat)

  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)
  const [chat, setChat] = useState([])

  const scrollRef = useRef(null)


  const sendMessage = async (e) => {
    e.preventDefault()

    if (!message || !Object.keys(currentChat).length) {
      return
    }

    scrollDown()
    setMessage('')
    setImage(null)    
    
    await api.sendMessage(
      name,
      url,
      user,
      currentChat.userName,
      currentChat.profileImage,
      currentChat.email,
      { text: message, attachment: image }
    )
  }


  useEffect(() => {
    let chatRef, chatListener, cleanupFunction = false

    const fetchChat = async () => {
      chatRef = await db.ref(CHATS).child([user, currentChat.email].sort().join(','))
      chatListener = await chatRef.on(VALUE, async sn => {
        const fetched = []
        for (let key in sn.val()) {
          const { date, text, sender, time, attachment } = sn.val()[key]
          fetched.push({ date, text, sender, time, attachment })
        }

        setChat(fetched)

        if (fetched[fetched.length - 1]?.sender !== name || user === currentChat.email) {
          await api.readDialog(name, currentChat.userName, user, currentChat.email)
        }
        scrollDown()
      })
    }

    if (currentChat.email)
      fetchChat()

    return () => {
      chatRef && chatRef.off('value', chatListener)
      cleanupFunction = true
    }
  }, [currentChat])


  const scrollDown = () => scrollRef.current.scrollIntoView({ behavior: SMOOTH })


  return(
    <div className="chat">
      <Info
        currentChat={ currentChat }
      />
      <Messages
        name={ name }
        chat={ chat }
        scrollRef={ scrollRef }
      />
      <NewMessage
        sendMessage={ sendMessage }
        message={ message }
        setMessage={ setMessage }
        image={ image }
        setImage={ setImage }
      />
    </div>
  )
}

export default Chat
