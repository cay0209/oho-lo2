import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { fetchFn } from '../etc/NetworkUtils';
import { Button, Card } from 'react-bootstrap';

function MyDayoff(props) {
  const username = useParams().username;
  const [dayoff, setDayoff] = useState(null);

  useEffect(() => {
    //fetchFn: api호출 -> 해당 멤버정보 가져옴
    fetchFn("GET", `http://localhost:9229/dayoff/${username}`, null)
      .then(data => {
        //member상태에 저장->렌더링됨.
        setDayoff(data.result);
      })
  }, [username]);




  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>내 연차 확인</h2>

      </div>

      <div className='pageAlign'>
        {
          //member상태 선언시 초깃값을 null로 설정했었음.
          //-> member가 null이 아닌 경우 = 데이터가 로딩된 경우에만 렌더링.
          dayoff !== null &&
          <>
            <div className='dayoff' style={{ display: 'flex', justifyContent: 'center' }}>
              <Card>
                <Card.Body>
                  <p>회원아이디: {username}</p>
                  <p>이름: {dayoff.name}</p>
                  <p>부서: {dayoff.department}</p>
                  <p>입사일자 :  {dayoff.hiredDate}</p>
                  <p>기본제공연차 : {dayoff.dayoff}</p>
                  <p>사용한 연차: {dayoff.usedDayoff}</p>
                  <p>총 [{dayoff.remainingDayoff}/{dayoff.dayoff}]개 남았습니다. </p>
                </Card.Body>
              </Card>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="dark" a href='/'>메인으로</Button>
            </div>




          </>

        }

      </div>
    </div>
  )
}

export default MyDayoff