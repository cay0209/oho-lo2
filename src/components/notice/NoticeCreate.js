import { Button, Card } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';


function NoticeCreate() {
  const LOGINER = localStorage.getItem("LOGINER");
  // const id = localStorage.getItem("ID");


  const subjectRef = useRef();
  const contentRef = useRef();

  const [member, setMember] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    //fetchFn: api호출 -> 해당 멤버정보 가져옴
    fetchFn("GET", `http://localhost:9229/members/detail/${LOGINER}`, null)//null->데이터 안가져감
      .then(data => {
        console.log("데이터 왔나?" + data)

        console.log(data.result.TOKEN)
        //member상태에 저장->렌더링됨.
        setMember(data.result);

      })
  }, [LOGINER]);




  function onSubmitHandler(event) {
    event.preventDefault();


    const formData = new FormData(event.target);
    const username = formData.get("username");
    // const id = formData.get("id");

    const name = formData.get("name");


    // let username = usernameRef.current.value;
    let subject = subjectRef.current.value;
    let content = contentRef.current.value;




    let url = "http://localhost:9229/notice/create"
    let options = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // id,
        username,
        name,
        subject,
        content

      })
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          alert("공지 작성 실패");
          throw new Error("공지 작성 중 에러가 발생했습니다.");
        }

        return res.json();
      })
      .then(data => {
        alert("공지 작성 성공");
        localStorage.setItem("ID", data.id);


        navigate(`/notice/all`)
      })
  }


  return (
    <div className='pages'>
    <div />
    <div class="header">

        <h2 >공지사항 작성</h2>

    </div>

    <div className='pageAlign' style={{ display: 'flex', justifyContent: 'flex-start' }} >
       



      {member !== null && (

        <>

        <form action='#' onSubmit={onSubmitHandler}>
   
        <Card>
                <Card.Body>

            {/* <p>회원아이디 : </p> */}
            <p><input name='username' style={{ display: 'none' }} defaultValue={LOGINER} readOnly /></p>


            <p>작성자 : {member.name}</p>
            <p><input name='name' style={{ display: 'none' }} defaultValue={member.name} readOnly /></p>

            {/* <p>비밀번호 : </p>
    <p><input name='password' defaultValue={member.password}  /></p> */}

            <p>제목 : </p>
            <p><input name='subject' ref={subjectRef} style={{ width: '100%', height: '30px'}} /></p>

            <p>내용 : </p>
            {/* <input id='reason' type='textarea' ref={reasonRef} /> */}
            <p><textarea name='content' ref={contentRef} style={{ width: '100%', height: '200px' }}></textarea></p>
            </Card.Body>
              </Card>

            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="dark" type="submit">공지 작성</Button>
            </div>
          </form>

        </>
      )
      }



</div>

    </div>
  )
}

export default NoticeCreate