import React from 'react'
// import { Table } from 'react-bootstrap';

// MemberList를 구성하는 단위.
function MemberComp(props) {

  const member = props.member;


  return (


    // <Table striped bordered hover>
    //   {/* <thead>
    //       <tr>
    //         <th>회원아이디</th>
    //         <th>비밀번호</th>
    //         <th>이름</th>
    //         <th>입사일자</th>
    //         <th>전화번호</th>
    //         <th>이메일</th>

    //       </tr>
    //     </thead> */}

    <tbody>
      <tr>
        <td>{member.username}</td>
        <td>{member.password}</td>
        <td>{member.name}</td>
        <td>{member.hiredDate}</td>
        <td>{member.phoneNumber}</td>
        <td>{member.email}</td>

      </tr>


    </tbody>

    // </Table>

  )
}

export default MemberComp