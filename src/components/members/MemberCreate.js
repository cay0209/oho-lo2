import React from 'react'

function MemberCreate() {


  return (
    <div>
        
        <h2>회원가입</h2>

        <form action='#' onSubmit={onSubmitHandler}>

    <p>회원아이디 : <input name='username'/> </p>
    <p>비밀번호 : <input name='password'/> </p>
    <p>비밀번호 확인 : <input name='password2'/> </p>
    <p>이름 : <input name='name'/> </p>
    <p>생년월일 : <input name='birthDate'/> </p>
    <p>전화번호 : <input name='phoneNumber'/> </p>
    <p>이메일 : <input name='email'/> </p>



    <button>가입하기</button>
    </form>

    </div>






  )
}

export default MemberCreate