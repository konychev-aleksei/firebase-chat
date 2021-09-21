import React, { memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux'
import { HIDE } from '../../config/index'


const Info = ({ currentChat }) => {
  const dispatch = useDispatch()

  return(
    <>
      {
        Object.keys(currentChat).length ?
        <div className="info">
          <button onClick={ () => dispatch({ type: HIDE }) }>
            <FontAwesomeIcon icon={ faArrowLeft } />
          </button>
          <img src={ currentChat?.profileImage } alt="" />
          <p>{ currentChat?.userName }</p>
        </div>
        : null
      }
    </>
  )
}

export default memo(Info)
