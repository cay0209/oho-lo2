import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function NoticeUpdate() {

  const [notice, setNotice] = useState(null);
  const ID = localStorage.getItem("ID");
  let { id } = useParams();
  console.log(id)


  // 수정 화면에 보여줄 데이터 가져오기
  useEffect(() => {

    fetchFn("GET", `http://localhost:9229/notice/detail/${ID}`, null)

      .then(data => {

        console.log(data.result)

        setNotice(data.result);
        console.log(data.result.readCount+"조회수")


      });

  }, [ID]);



  // 리액트에서는 input 태그의 value 속성에 값을 넣으면, 해당 input 태그에 다른 값을 넣을 수 없다.
  // 이런 문제로 인해서 input이벤트가 발생할 때마다 그 값이 변하도록 state 관리를 해야 하는데
  // 그 내용을 구현한 것임.

  function onInputHandler(e) {

    //val: 사용자가 새로 입력한 값
    //현재 <input> 요소의 값(value)를 추출하여 val 변수에 저장
    let val = e.target.value;

    //notice를 복제(clone)한 다음, 새로운 값을 포함하는 객체를 생성
    const newNotice = { ...notice, [e.target.name]: val };
    //[e.target.name]은 이벤트가 발생한 <input> 요소의 name 속성을 사용하여 업데이트할 필드를 선택하고, 그 필드에 새로운 val 값을 할당

    setNotice(newNotice);

  }

  // 
  function onChangeHandler(e) {


    let val = e.target.value;

    const newNotice = { ...notice, [e.target.name]: val };

    console.log(newNotice);

    setNotice(newNotice);

  }






  // 수정 버튼을 클릭했을 때, 데이터를 가지고 api 서버와 통신하게 한 코드
  function onSubmitHandler(e) {

    e.preventDefault();

    const formData = new FormData(e.target);

    const id = formData.get("id");

    const username = notice.username;

    const name = notice.name;

    const subject = formData.get("subject");
    const content = formData.get("content");



    // const subject = formData.get("subject");

    // const content = formData.get("content");


    const dto = {
      id,
      username,
      name,
      subject,
      content

    };



    fetchFn("PUT", "http://localhost:9229/notice/update", dto)

      .then(data => {

        window.location.href = `/notice/detail/${ID}`;

      });
  }

  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>공지글 수정</h2>

      </div>
      <div className='pageAlign'>



        {

          notice !== null && <>
            <form action='#' onSubmit={onSubmitHandler}>
              {/* <input type="hidden" id="goodsId" name="goodsId" value="${goodsDto.goodsId }"/> */}
              <Card>
                <Card.Body>
                  <p>글번호: {ID} </p>
                  <p><input
                    name='id'
                    style={{ display: 'none' }}
                    value={ID}
                    // onInput={onInputHandler} 
                    /> </p>


                  <p>회원아이디 : {notice.username}  </p>
                  <p><input 
                  name='username' 
                  style={{ display: 'none' }} 
                  value={notice.username}
                  // onInput={onInputHandler}
                   /> </p>

                  <p>작성자 : {notice.name}</p>
                  <p><input 
                  name='name' 
                  style={{ display: 'none' }} 
                  value={notice.name}
                  // onInput={onInputHandler} 
                  /></p>


                  {/* <input ref={LOGINER} readOnly disabled defaultValue={username} /> */}

                  {/* <p>비밀번호 : </p>
          <p>  <input name='password' onInput={onInputHandler} /> </p> */}


                  <p>제목 : </p>
                  <p><input 
                  name='subject' 
                  value={notice.subject} 
                  style={{ width: '100%', height: '30px' }} 
                  // onInput={onInputHandler} 
                  onChange={onChangeHandler}/> </p>
                  
                  <p>내용 : </p>
                  <p><textarea 
                  name='content' 
                  value={notice.content} 
                  style={{ width: '100%', height: '300px' }} 
                  // onInput={onInputHandler} 
                  onChange={onChangeHandler}/> </p>
                </Card.Body>
              </Card>

              <br />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="dark" type="submit" >수정하기</Button>
              </div>
            </form>

          </>
        }
      </div>
    </div>
  )
}

export default NoticeUpdate