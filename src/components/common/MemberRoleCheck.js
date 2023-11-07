import React, { useState } from 'react'

function MemberRoleCheck() {
    const LOGINER = localStorage.getItem("LOGINER");
    const ROLE = localStorage.getItem("ROLE");

    const [member, setMember] = useState(null); //null이었는데 username으로 바꿔봄

    if (member == null) {
        alert("로그인 후 이용 가능합니다.")
        window.location.href = `/`

    } else if (member != null && ROLE === null) {
        alert("로그인 후 이용 가능합니다.")
        window.location.href = `/`
    }
}

export default MemberRoleCheck