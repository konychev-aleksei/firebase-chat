import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SHOW, NEW_CHAT } from '../../config/index'


const ChatButton = ({ userName, text, profileImage, unread, email, setShowChat }) => {
  const dispatch = useDispatch()
  const currentChat = useSelector(state => state.chat)

  return(
    <div
      onClick={ () => {
        dispatch({ type: SHOW })
        dispatch({ type: NEW_CHAT, payload: { email, userName, profileImage } })
      }}
      className= { `message${ currentChat.email === email ? ' selected' : '' }` }
    >
      <img src={ profileImage } alt="" />
      <div className="content">
        <b>{ userName }</b>
        <p>{ text.lengh > 30 ? text.substring(0, 30) + '...' : text }</p>
      </div>
      <div className="unread">
        {
          unread === -1 ?
          <div className="him"></div>
          :
          unread === 0 ? null : <div className="me">{ unread }</div>
        }
      </div>
    </div>
  )
}


export default memo(ChatButton)
