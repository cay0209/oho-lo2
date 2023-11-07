import React from 'react'

function NoticeComp(props) {

  const notice = props.notice;


  return (
    <div>

      <p>{notice.id}</p>
      <p>{notice.subject}</p>
      <p>{notice.username}</p>
      <p>{notice.readCount}</p>
      <p>{notice.createdDate}</p>






    </div>
  )
}

export default NoticeComp