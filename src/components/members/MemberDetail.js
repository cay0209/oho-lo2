import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';



function MemberDetail() {


    //이곳에 오는 주소 /members/detail/{username}의 :username을 획득
    let { username } = useParams();
    console.log(username)


    // const [LOGINER, setLOGINER] = useState(null);
    // member라는 상태(스테이트), member를 변경할 수 있는 setMember함수. 초깃값 null로 설정
    const [member, setMember] = useState(null); //null이었는데 username으로 바꿔봄


    //useEffect: 컴포넌트가 마운트되거나 username이 변경될 때마다 실행
    useEffect(() => {
        //fetchFn: api호출 -> 해당 멤버정보 가져옴
        fetchFn("GET", `http://localhost:9229/members/detail/${username}`, null)//null->데이터 안가져감
            .then(data => {
                console.log("데이터 왔나?" + data)

                // if ( LOGINER === username) {

                //member상태에 저장->렌더링됨.
                console.log(data.result)
                console.log(username)

                // setLOGINER(data.result.username);
                setMember(data.result);
                localStorage.setItem("USERNAME", data.result.username);
                console.log(data.result.username+"유저네임")

                // window.location.href = `/members/detail/${data.result.username}`;
                // }
            })
    }, [username]);

    // window.location.href = `/members/detail/${username}`;


    return (
        <div className='pages'>
            <div />
            <div class="header">

                <h2 align='left'>내 정보 보기</h2>

            </div>

            <div className='pageAlign'>
                {
                    //member상태 선언시 초깃값을 null로 설정했었음.
                    //-> member가 null이 아닌 경우 = 데이터가 로딩된 경우에만 렌더링.
                    member !== null && (

                        <>
                            <div className='member' style={{ display: 'flex', justifyContent: 'center' }}>
                                <Card>
                                    <Card.Body>
                                        {/* <p>회원아이디: <input name='name'  */}
                                        <p>회원아이디: {member.username} </p>
                                        {/* /></p> */}
                                        {/* <p><input defaultValue={LOGINER} readOnly /></p> */}
                                        {/* <p>비밀번호:  {member.password}</p> */}
                                        <p>이름: {member.name}</p>
                                        <p>부서: {member.department}</p>
                                        <p>입사일자: {member.hiredDate}</p>
                                        <p>전화번호: {member.phoneNumber}</p>
                                        <p>이메일: {member.email}</p>
                                    </Card.Body>
                                </Card>
                            </div>



                            <br />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Button variant="dark" href='/members/update'>정보수정</Button>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <Button variant="dark" href='/members/delete'>회원탈퇴</Button>
                                </div>
                            </div>





                        </>

                    )}
            </div>
        </div>
    )
}


export default MemberDetail