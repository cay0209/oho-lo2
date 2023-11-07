import React from 'react'

import { Button } from 'react-bootstrap';
import { fetchFn } from '../etc/NetworkUtils';



function MemberLogin() {

    // 로그인 요청할 때, 기존 로그인과 관련된 토큰 초기화
    localStorage.setItem("BTOKEN", null);


    function onSubmitHandler(e) {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
    
        const dto = {
            username,
            password,
        }
    
        fetchFn("POST", "http://localhost:9229/auth/login", dto)
        .then(data => {
           
                // 로그인 성공한 경우
                localStorage.setItem("LOGINER", data.result.username);
                localStorage.setItem("BTOKEN", data.result.token);
                localStorage.setItem("ROLE", data.result.role);
                localStorage.setItem("NAME", data.result.name);

                window.location.href = "/";
            } 

            
        );
}
    


  



    return (
        <div className='pages'>
            <div />
            <div class="header">

                <h2 align='left'>로그인</h2>

            </div>

            <div className='pageAlign'>
                <form action='#' onSubmit={onSubmitHandler}>

                <p style={{ display: 'flex', justifyContent: 'center' }}>회원아이디: </p>
                <p style={{ display: 'flex', justifyContent: 'center' }}>  <input name='username' /> </p>
                <p style={{ display: 'flex', justifyContent: 'center' }}>비밀번호:</p>
                <p style={{ display: 'flex', justifyContent: 'center' }}>  <input name='password' /> </p>

                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="dark" type="submit">로그인하기</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MemberLogin