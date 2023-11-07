import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import MemberRoleCheck from '../common/MemberRoleCheck';


// useParams: Router에서 URL 매개변수를 추출하는 데 사용
// useState: 상태 변경
function NoticeDetail() {

    let { id } = useParams();
    console.log(id)

    const ROLE = localStorage.getItem("ROLE");

    const [notice, setNotice] = useState(null);


    useEffect(() => {
        //fetchFn: api호출 -> 해당 멤버정보 가져옴
        fetchFn("GET", `http://localhost:9229/notice/detail/${id}`, null)//null->데이터 안가져감
            .then(data => {
                console.log("조회수" + data.result.readCount)

                //member상태에 저장->렌더링됨.

                setNotice(data.result);
                localStorage.setItem("ID", data.result.id);
                console.log(data.result.id + "글번호")
                console.log(data.result.content + "글내용")
                console.log(data.result.readCount + "조회수")



                // window.location.href = `/members/detail/${data.result.username}`;

            })
    }, [id]);





    function deleteHere() {

        let isOk = window.confirm("정말 삭제하시겠습니까?");

        if (isOk) {
            const dto = {
                id
            };


            fetchFn("DELETE", "http://localhost:9229/notice/delete", dto)

                .then(data => {

                    window.location.href = "/notice/all";

                });

        }

    }


    return (
        <div className='pages'>
            <div />
            <div class="header">

                <h2 align='left'>공지사항 읽기</h2>

            </div>

            <div className='pageAlign'>
                {
                    //member상태 선언시 초깃값을 null로 설정했었음.
                    //-> member가 null이 아닌 경우 = 데이터가 로딩된 경우에만 렌더링.
                    notice !== null && (

                        <>
                            <div className='notice'>
                                <Card >
                                    <Card.Body>
                                        <div class='details' >
                                            <p>글번호: {id} </p>
                                            <p>작성자: {notice.name} </p>
                                            <p>작성일: {notice.updatedDate || notice.createdDate}</p>
                                            <p>조회수: {notice.readCount}</p>

                                            {/* /></p> */}
                                            {/* <p><input defaultValue={LOGINER} readOnly /></p> */}
                                            {/* <p>비밀번호:  {member.password}</p> */}
                                            <p>제목: </p>
                                            <p><input name='subject' value={notice.subject} style={{ width: '100%', height: '30px' }} /> </p>

                                            <p>내용: </p>
                                            <p><textarea name='content' value={notice.content} style={{ width: '100%', height: '300px', textAlign: 'start' }} /> </p>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            {/* <br />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="dark" a href='/notice/all'>글 목록</Button>
                        </div> */}
                            {/* 회원 권한에 따라 글쓰기 버튼 유무 달라짐 */}
                            {ROLE === "0" ? (
                                null
                            )
                                :
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="dark" a href='/notice/update' style={{ marginRight: '10px' }}>글 수정</Button>
                                    <Button variant="dark" Link onClick={deleteHere}>글 삭제</Button>


                                </div>
                            }


                        </>

                    )}
            </div>
        </div>
    )
}


export default NoticeDetail