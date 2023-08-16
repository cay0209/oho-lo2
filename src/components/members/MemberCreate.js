import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// useRef : 유저가 입력한 값 가져오기
// onSubmitHandler : 폼 제출하여 등록 기능 되도록 함.
// fetch : 서버로 POST요청 & 응답 처리
// useNavigate: 회원가입 완료 후 이동
function MemberCreate() {

  //useNavigate(): 라우터 네비게이션 수행할 수 있는 함수(navigate) 가져옴
  const navigate = useNavigate();

  //useRef(): 각각의 입력필드 참조하는 변수 생성 -> 입력된 값을 가져올 수 있음.
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const nameRef = useRef();
  const birthDateRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();



  //onSubmitHandler 시작: 등록한 값 제출하는 과정.
  function onSubmitHandler(event){
    event.preventDefault();
  

  //Ref변수 이용해서 각각의 input태그에 입력된 값 가져오기
  let username = usernameRef.current.value;
  let password = passwordRef.current.value;
  let password2 = password2Ref.current.value;
  let name = nameRef.current.value;
  let birthDate = birthDateRef.current.value;
  let phoneNumber = phoneNumberRef.current.value;
  let email = emailRef.current.value;

  
  let url = "http://localhost:9229/members/create"
  let options = {
    method: "POST",
    headers: 
    {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      username,
      password,
      password2,
      name,
      birthDate,
      phoneNumber,
      email
    })
  }

  fetch(url, options)
  .then(res =>{
    if(!res.ok){
      alert("등록 실패");
      throw new Error("등록 중 에러가 발생했습니다.");
    }

    return res.json();
  })
  .then(data => {
    alert("입력 성공");
    navigate(`/`)
  })
}
//onSubmitHandler 끝.



//커서가 맨 처음 칸(username)에 위치하도록
useEffect(()=>{usernameRef.current.focus()}, [])




  return (
    <div>
        
        <h2>회원가입</h2>

        <form action='#' onSubmit={onSubmitHandler}>

   {/* name='username' 형식-> ref={ref={usernameRef}}으로 변경 */}
    <p>회원아이디 : <input ref={usernameRef} /> </p>
    <p>비밀번호 : <input ref={passwordRef} /> </p>
    <p>비밀번호 확인 : <input ref={password2Ref} /> </p>
    <p>이름 : <input ref={nameRef} /> </p>
    <p>생년월일 : <input ref={birthDateRef} /> </p>
    <p>전화번호 : <input ref={phoneNumberRef} /> </p>
    <p>이메일 : <input ref={emailRef} /> </p>



    <button>가입하기</button>
    </form>

    </div>

  )
  
}


export default MemberCreate