import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'

// useRef : 유저가 입력한 값 가져오기
// onSubmitHandler : 폼 제출하여 등록 기능 되도록 함.
// fetch : 서버로 POST요청 & 응답 처리
// useNavigate: 회원가입 완료 후 이동
function MemberCreate() {
  // 로그인 요청할 때, 기존 로그인과 관련된 토큰 초기화
  localStorage.setItem("BTOKEN", null);


  //useNavigate(): 라우터 네비게이션 수행할 수 있는 함수(navigate) 가져옴
  // const navigate = useNavigate();

  //useRef(): 각각의 입력필드 참조하는 변수 생성 -> 입력된 값을 가져올 수 있음.
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const nameRef = useRef();
  const departmentRef = useRef();

  const hiredDateRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();





  //onSubmitHandler 시작: 등록한 값 제출하는 과정.
  function onSubmitHandler(event) {
    event.preventDefault();


    //Ref변수 이용해서 각각의 input태그에 입력된 값 가져오기
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    let password2 = password2Ref.current.value;
    let name = nameRef.current.value;
    let department = departmentRef.current.value;

    let hiredDate = hiredDateRef.current.value;
    let phoneNumber = phoneNumberRef.current.value;
    let email = emailRef.current.value;


    let url = "http://localhost:9229/auth/create"
    let options = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2,
        name,
        department,
        hiredDate,
        phoneNumber,
        email
      })
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          alert("회원가입 실패");

          throw new Error("회원가입 중 에러가 발생했습니다.");
        }

        return res.json();
      })
      .then(data => {
        alert("회원가입 성공");
        // BTOKEN을 초기화함
        localStorage.setItem("BTOKEN", null);
        window.location.href = `/`;
      })
  }
  //onSubmitHandler 끝.





  //커서가 맨 처음 칸(username)에 위치하도록
  useEffect(() => { usernameRef.current.focus() }, [])




  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>회원가입</h2>

      </div>

      <div className='pageAlign' style={{ display: 'flex', justifyContent: 'center' }}>

        <form action='#' onSubmit={onSubmitHandler}>

          {/* name='username' 형식-> ref={ref={usernameRef}}으로 변경 */}
          <p style={{ display: 'flex', justifyContent: 'center' }}>회원아이디 : </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>  <input id='username' ref={usernameRef} style={{ width: '30%', height: '30px' }} /> </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>비밀번호 : </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}> <input id='password' type='password' ref={passwordRef} style={{ width: '30%', height: '30px' }} /> </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>비밀번호확인 : </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>   <input id='password2' type='password' ref={password2Ref} style={{ width: '30%', height: '30px' }} /> </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>이름 : </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>  <input id='name' ref={nameRef} style={{ width: '30%', height: '30px' }} /> </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>부서 : </p>
          <select name="department" ref={departmentRef} style={{ display: 'flex', justifyContent: 'center', width: '30%', height: '30px', margin: '0 auto' }}>
            <option value="인사">인사</option>
            <option value="기획">기획</option>
            <option value="회계">회계</option>
            <option value="개발">개발</option>
            <option value="영업">영업</option>
          </select>
          <p></p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>입사일자 :</p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>  <input id='hiredDate' type='date' width={500} ref={hiredDateRef} style={{ width: '30%', height: '30px' }} /> </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>전화번호 :</p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>  <input id='phoneNumber' type='tel' ref={phoneNumberRef} placeholder='000-0000-0000' style={{ width: '30%', height: '30px' }} /> </p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>이메일 :</p>
          <p style={{ display: 'flex', justifyContent: 'center' }}>  <input id='email' type='email' ref={emailRef} placeholder='aeyoung@mail.com' style={{ width: '30%', height: '30px' }} /> </p>
          <br />





          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="dark" type="submit">가입하기</Button>
          </div>

        </form>

      </div>
    </div>

  )

}


export default MemberCreate