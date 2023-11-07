import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';

function MemberUpdate() {
    // const username = useParams().username;
    const [member, setMember] = useState([]);
    const LOGINER = localStorage.getItem("LOGINER");


    // 수정 화면에 보여줄 데이터 가져오기
    useEffect(() => {

        fetchFn("GET", `http://localhost:9229/members/detail/${LOGINER}`, null)

            .then(data => {

                setMember(data.result);
                console.log(data.result);

            });

    }, [LOGINER]);

    // 리액트에서는 input 태그의 value 속성에 값을 넣으면, 해당 input 태그에 다른 값을 넣을 수 없다.
    // 이런 문제로 인해서 input이벤트가 발생할 때마다 그 값이 변하도록 state 관리를 해야 하는데
    // 그 내용을 구현한 것임.

    function onInputHandler(e) {

        let val = e.target.value;//입력이 이뤄지고 있는 input 태그에서 value를 가져온.

        //state에 저장된 값이 숫자나 true/false, 문자열이 아니면

        // 객체 자체가 바뀌어야 state가 바뀐 게 되어 렌더링이 발생한다. 그렇지 않고 객체의 속성값만 바꾸어서는 렌더링이 안 됨.

        // {...member}는 member 객체가 갖고 있는 값을 전부 newMember 객체에 복사한다는 의미임.

        // [e.target.name] : 입력이 이뤄지고 있는 input태그의 name 속성값을 가져온다는 의미.

        let newMember = { ...member, [e.target.name]: val };



        setMember(newMember);

    }

    function onChangeHandler(e) {


        let val = e.target.value;

        let newMember = { ...member, [e.target.name]: val };

        console.log(newMember);

        setMember(newMember);

    }

    // 수정 버튼을 클릭했을 때, 데이터를 가지고 api 서버와 통신하게 한 코드
    function onSubmitHandler(e) {

        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get("username");

        const orgPassword = formData.get("orgPassword");

        const password = formData.get("password");
        const password2 = formData.get("password2");

        const name = formData.get("name");
        const department = formData.get("department");


        const hiredDate = formData.get("hiredDate");

        const phoneNumber = formData.get("phoneNumber");

        const email = formData.get("email");




        const dto = {
            username,
            orgPassword,
            password,
            password2,
            name,
            department,
            hiredDate,
            phoneNumber,
            email

        };



        fetchFn("PUT", "http://localhost:9229/members/update", dto)

            .then(data => {

                window.location.href = `/members/detail/${LOGINER}`;

            });

    }

    // navigate(`/members/detail/${LOGINER}`);

    // useEffect(() => { orgPasswordRef.current.focus() }, [])



    return (
        <div className='pages'>
            <div />
            <div class="header">

                <h2 align='left'>회원정보 수정</h2>

            </div>

            <div className='pageAlign2' style={{ display: 'flex', justifyContent: 'center' }}>
                <form action='#' onSubmit={onSubmitHandler}>

                    <Card style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card.Body>


                            <p>회원아이디 : {LOGINER}</p>
                            <p><input name='username' style={{ display: 'none' }} value={LOGINER} readOnly /> </p>


                            {/* <input ref={LOGINER} readOnly disabled defaultValue={username} /> */}

                            <p> 변경전 비밀번호 : </p> 
                            <p><input
                                name='orgPassword'
                                value={member.orgPassword}
                                onChange={onChangeHandler} /> </p>
                            <p>새 비밀번호 :  </p> 
                            <p>  <input
                                name='password'
                                value={member.password}
                                onChange={onChangeHandler} /> </p>
                            <p>비밀번호 확인 : </p>  
                            <p>   <input
                                name='password2'
                                value={member.password2}
                                onChange={onChangeHandler} /> </p>
                            <p> 이름 : </p> 
                            <p><input
                                name='name'
                                value={member.name}
                                onChange={onChangeHandler} /> </p>
                            <p>부서 :</p> 
                            <p>  <select
                                    name="department"
                                    value={member.department}
                                    onChange={onChangeHandler}
                                    style={{  width: '100%', height: '30px', margin: '0 auto' }}
                                >
                                    <option value="인사">인사</option>
                                    <option value="기획">기획</option>
                                    <option value="회계">회계</option>
                                    <option value="개발">개발</option>
                                    <option value="영업">영업</option>
                                </select>
                            </p>




                            <p>입사일자 : </p> 
                            <p>  <input type='date'
                                name='hiredDate'
                                value={member.hiredDate}
                                onChange={onChangeHandler}
                                style={{  width: '100%', height: '30px', margin: '0 auto' }}
                                /> </p>
                            <p>전화번호 : </p> 
                            <p>  <input
                                name='phoneNumber'
                                value={member.phoneNumber}
                                onChange={onChangeHandler} /> </p>
                            <p>이메일 : </p> 
                            <p> <input type='email'
                                name='email'
                                value={member.email}
                                onChange={onChangeHandler} /> </p>

                            <br />

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="dark" type="submit">수정하기</Button>
                            </div>
                        </Card.Body>


                    </Card>
                </form>
            </div>



        </div>

    )
}

export default MemberUpdate