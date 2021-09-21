import React, { memo } from 'react'

import Message from './Message'


const Messages = ({ chat, name, scrollRef }) => {
  return(
    <div className="messages">
      {
        chat.length ?
        chat.map(({ date, text, sender, time, attachment }, index) => {
          let newDate = null

          if (index === 0 || date !== chat[index - 1].date) {
            newDate = <div className="date">{ date }</div>
          }

          return(
            <Message
              key={ index }
              newDate={ newDate }
              className={ `message-quote${ sender === name ? ' sent' : '' }` }
              text={ text }
              attachment={ attachment }
              time={ time }
            />
          )
        })
        :
        <div className="date">PICK A CHAT</div>
      }
      <div ref={ scrollRef } />
    </div>
  )
}


export default memo(Messages)
