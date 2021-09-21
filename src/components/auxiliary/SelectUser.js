import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NEW_CHAT, SHOW } from '../../config/index'


const SelectUser = ({ setFound, inputRef, email, userName, profileImage }) => {
  const dispatch = useDispatch()

  return(
    <div
      onClick={ () => {
        dispatch({ type: NEW_CHAT, payload: { email, userName, profileImage } })
        dispatch({ type: SHOW })
        setFound([])
        inputRef.current.value = ''
      }}
      className="search-item"
    >
    { email }
    </div>
  )
}


export default memo(SelectUser)
