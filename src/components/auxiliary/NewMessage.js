import React, { memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import FileBase from 'react-file-base64'


const NewMessage = ({ sendMessage, message, setMessage, image, setImage }) => {
  return(
    <form onSubmit={ sendMessage } className="inputs">
      <input value={ message } onChange={ (e) => {
        if (e.target.value.length <= 300) {
          setMessage(e.target.value)
        }
      }} placeholder="Write a message..." type="text" />
      <button type="button">
        {
          image ?
          <>
            <img src={ image } alt="" />
            <FontAwesomeIcon className="times" onClick={ () => setImage('') } icon={ faTimesCircle } />
          </>
          :
          <label>
            <FileBase type="file" onDone={({ base64 }) => setImage(base64)} />
            <FontAwesomeIcon className="cursored" icon={ faImage } />
          </label>
        }
      </button>
      <button style={{ opacity: message ? '1' : '.5' }}>
        <FontAwesomeIcon icon={ faPaperPlane } />
      </button>
    </form>
  )
}


export default memo(NewMessage)
