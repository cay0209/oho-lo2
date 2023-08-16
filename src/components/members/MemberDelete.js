import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function MemberDelete() {


    //const [username] = useState("해당 유저의 아이디")

    const usernameRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const navigate = useNavigate();

    function onSubmitHandler(event){
        event.preventDefault();

        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        let password2 = password2Ref.current.value;

        let url = "http://localhost:9229/members/delete"
        let options = {
            method: "DELETE",
            headers:
            {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password2

            })
        }

        fetch(url, options)
        .then(res =>{
            if(!res.ok){
                alert("탈퇴 실패");
                throw new Error("삭제 중 에러가 발생했습니다.");
            }

            return res.json();
        })
        .then(data=>{
            alert("탈퇴 성공");
            navigate(`/`)
        })

    }


    useEffect(()=>{usernameRef.current.focus()}, [])


    
  return (
    <div>
        <h2>회원탈퇴</h2>

        <form action='#' onSubmit={onSubmitHandler}>


        {/* <p>회원아이디: <input value={username} readOnly/> </p> */}
        
        <p>회원아이디: <input ref={usernameRef}/></p>
        <p>비밀번호: <input ref={passwordRef}/> </p>
        <p>비밀번호 확인: <input ref={password2Ref}/> </p>

        <button>탈퇴하기</button>


        </form>


    </div>
  )
}

export default MemberDelete