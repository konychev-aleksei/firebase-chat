import React, { memo } from 'react'


const Message = ({ newDate, className, text, attachment, time }) => {
  return(
    <>
      { newDate }
      <div className={ className }>
        { text }
        { attachment ? <img src={ attachment } alt="" /> : null }
        <div className="time">{ time }</div>
      </div>
    </>
  )
}

export default memo(Message)
