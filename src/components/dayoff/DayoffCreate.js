import React, { useEffect, useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';

//연차상신
function DayoffCreate() {

  const navigate = useNavigate();

  const username = useParams().username;

  // const usernameRef = useRef();
  const typeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const reasonRef = useRef();


  const LOGINER = localStorage.getItem("LOGINER");
  // const name = localStorage.getItem("member.name");

  const [member, setMember] = useState(null);

  useEffect(() => {
    //fetchFn: api호출 -> 해당 멤버정보 가져옴
    fetchFn("GET", `http://localhost:9229/members/detail/${LOGINER}`, null)//null->데이터 안가져감
      .then(data => {
        console.log("데이터 왔나?" + data)

        console.log(data.result.TOKEN)
        //member상태에 저장->렌더링됨.
        setMember(data.result);

      })
  }, [username]);

  function onSubmitHandler(event) {
    event.preventDefault();


    const formData = new FormData(event.target);
    const username = formData.get("username");
    const name = formData.get("name");
    const department = formData.get("department");




    // let username = usernameRef.current.value;
    let type = typeRef.current.value;
    let startDate = startDateRef.current.value;
    let endDate = endDateRef.current.value;
    let reason = reasonRef.current.value;



    let url = "http://localhost:9229/dayoff/create"
    let options = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        name,
        department,
        type,
        startDate,
        endDate,
        reason
      })
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          alert("연차상신 실패");
          throw new Error("연차상신 중 에러가 발생했습니다.");
        }

        return res.json();
      })
      .then(data => {
        alert("연차상신 성공");
        navigate(`/`)
      })
  }


  return (

    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>연차 상신</h2>

      </div>

      <div className='pageAlign'  style={{ display: 'flex', justifyContent: 'flex-start' }}>

        {member !== null && (

          <>

            <form action='#' onSubmit={onSubmitHandler}>

            <Card>
                <Card.Body>
              {/* <p>회원아이디 : </p> */}
              <p><input name='username' style={{ display: 'none' }} defaultValue={LOGINER} readOnly /></p>

              <p>이름 : {member.name}</p>
              <p><input name='name' style={{ display: 'none' }} defaultValue={member.name} readOnly /></p>


              {/* <p><label htmlFor="dayoffType">연차구분:</label></p> */}
              연차구분: <select name="dayoffType" ref={typeRef} style={{ width: '20%', height: '30px'}}>
                <option value="연차">연차</option>
                <option value="오전반차">오전반차</option>
                <option value="오후반차">오후반차</option>
              </select>
              <p></p>

              {/* <p>사용날짜 : </p> */}
              <p>사용날짜 : <input name='startDate' type='date' ref={startDateRef} /> ~ <input id='endDate' type='date' ref={endDateRef} /></p>
              {/* <p>사용일수 : </p> */}
              <p>연차사유 : </p>
              {/* <input id='reason' type='textarea' ref={reasonRef} /> */}
              <p><textarea name='reason' ref={reasonRef} style={{ width: '100%', height: '200px' }}></textarea></p>

              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="dark" type="submit">연차상신</Button>
              </div>

              </Card.Body>
              </Card>
            </form>

          </>
        )
        }
      </div>
    </div>
  )
}

export default DayoffCreate