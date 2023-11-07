import React, { useEffect, useState } from 'react';
import { fetchFn } from '../etc/NetworkUtils';
import { Table } from 'react-bootstrap';
import './MemberList.css'; // Import the CSS file
import MemberListPaging from './MemberListPaging';

function MemberList() {
  const [members, setMembers] = useState([]); 
  const [pageList, setPageList] = useState([]);


  useEffect(() => {
    fetchFn("GET", "http://localhost:9229/members/all?pageNum=0", null)
      .then(data => {
        console.log(data.content);
        setPageList(data.content);

        setMembers(data.content);
      });
  }, []);


  // members 배열을 username을 기준으로 오름차순으로 정렬
  const sortedMembers = [...members].sort((a, b) => {
    if (a.username === b.username) {
      // 같은 username을 가진 경우 시간 순서대로 정렬
      return new Date(a.timestamp) - new Date(b.timestamp);
    }
    return a.username.localeCompare(b.username);
  });

  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>전체 회원 목록</h2>

      </div>

      <div className='pageAlign' style={{ display: 'flex', justifyContent: 'flex-start' }}>

        <Table striped bordered hover > {/* Apply table styles */}
          <thead>
            <tr align='center'>
              <th >회원아이디</th>
              <th>이름</th>
              <th>부서</th>
              <th>입사일자</th>
              <th>전화번호</th>
              <th>이메일</th>
            </tr>
          </thead>

          <tbody>
          {pageList.length > 0 &&
            pageList.map((member) => (
              <tr key={member.id} align='center'>
                <td>{member.username}</td>
                <td>{member.name}</td>
                <td>{member.department}</td>
                <td>{member.hiredDate}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.email}</td>
              </tr>
            ))
            }
          </tbody>
        </Table>

        <MemberListPaging setFn={setPageList} />

      </div>

    </div>
  );
}

export default MemberList;
