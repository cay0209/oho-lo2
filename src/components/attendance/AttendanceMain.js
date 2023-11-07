import React from 'react'
import { Button } from 'react-bootstrap';

function AttendanceMain() {

  const LOGINER = localStorage.getItem("LOGINER");
  const NAME = localStorage.getItem("NAME");



  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const name = formData.get("name");
    const currentTime = new Date().toLocaleTimeString();



    let url = "http://localhost:9229/attendance"
    let options = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        name,
        currentTime
      })
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          alert("출퇴근시간 기록 실패");
          throw new Error("출퇴근시간 기록 중 에러가 발생했습니다.");
        }

        return res.json();
      })
      .then(data => {
        alert("출퇴근시간 기록 성공");
        //   navigate(`/`)
      })
  }



  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>출퇴근기록</h2>

      </div>

      <div className='pageAlign'>
        <form action='#' onSubmit={onSubmitHandler}>


          {/* 이벤트 핸들러 함수의 이름을 문자열"이름()"로 넘기는 대신, 직접 함수 자체를 전달{이름} */}
          {/* <button onClick={checkTime} > 출근</button >
            <button onClick={checkTime} > 퇴근</button > */}
          <>
            <p><input name='username' style={{ display: 'none' }} defaultValue={LOGINER} readOnly /></p>
            <p><input name='name' style={{ display: 'none' }} defaultValue={NAME} readOnly /></p>

            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="dark" type="submit"> 시간기록</Button >
            </div>
          </>
        </form>

      </div>
    </div>
  )
}


export default AttendanceMain