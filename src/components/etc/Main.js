import React from 'react'
import { Link } from 'react-router-dom'

function Main() {

    



  return (
    <div>
        <h2>메인 페이지</h2>

        <Link to = {"/members/create"}>회원가입하기</Link>
        <Link to = {"/members/delete"}>회원탈퇴하기</Link>


        



    </div>
  )
}

export default Main