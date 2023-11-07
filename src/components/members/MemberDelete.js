import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MemberDelete() {
    // const username = useParams().username;

    //const [username] = useState("해당 유저의 아이디")

    // const username = localStorage.getItem("username");
    const passwordRef = useRef();
    const password2Ref = useRef();
    const LOGINER = localStorage.getItem("LOGINER");


    const navigate = useNavigate();

    function onSubmitHandler(event) {
        event.preventDefault();

        // let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        let password2 = password2Ref.current.value;

        let url = "http://localhost:9229/members/delete"
        let options = {
            method: "DELETE",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // username,
                password,
                password2

            })
        }

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    alert("탈퇴 실패");
                    throw new Error("삭제 중 에러가 발생했습니다.");
                }

                return res.json();
            })
            .then(data => {
                alert("탈퇴 성공");
                navigate(`/`)
            })
        //삭제 후 자동로그아웃.
        localStorage.setItem("BTOKEN", null);

    }
    //    window.location.href="/";



    // useEffect(() => { usernameRef.current.focus() }, [])



    return (
        <div className='pages'>
            <div />
            <div class="header">

                <h2 align='left'>회원 탈퇴</h2>

            </div>

            <div className='pageAlign'>

                <form action='#' onSubmit={onSubmitHandler}>



                    <p style={{ display: 'flex', justifyContent: 'center' }}>회원아이디: </p>
                    {/* <p><input val={username} /></p> */}
                    <p style={{ display: 'flex', justifyContent: 'center' }}><input defaultValue={LOGINER} readOnly /></p>
                    {/* style={{ display: 'none' }} */}

                    <p style={{ display: 'flex', justifyContent: 'center' }}>비밀번호:</p>
                    <p style={{ display: 'flex', justifyContent: 'center' }}> <input ref={passwordRef} type="password" /> </p>
                    <p style={{ display: 'flex', justifyContent: 'center' }}>비밀번호 확인: </p>
                    <p style={{ display: 'flex', justifyContent: 'center' }}><input ref={password2Ref} type="password" /> </p>

                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="dark" type="submit">탈퇴하기</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default MemberDelete