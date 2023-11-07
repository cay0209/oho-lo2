import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchFn } from '../etc/NetworkUtils';
import { Table } from 'react-bootstrap';
import AttendanceListPaging from './AttendanceListPaging';

function AttendanceListAll(props) {

  const [attendances, setAttendances] = useState([]);
  const [pageList, setPageList] = useState([]);


  useEffect(() => {
    fetchFn("GET", `http://localhost:9229/attendance/all?pageNum=0`, null)
      .then(data => {
        console.log(data)
        console.log(data.number)

        setPageList(data.content);
        setAttendances(data.content)
      })
  }, []);

  //배열을 시간 순서대로 정렬
  const sortedAttendances = [...attendances].sort((a, b) => {
    // 시간 순서대로 정렬
    const timeComparison = new Date(a.timestamp) - new Date(b.timestamp);

    // 시간이 같으면 username을 오름차순으로 정렬
    if (timeComparison === 0) {
      return a.username.localeCompare(b.username);
    }

    return timeComparison;
  });



  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>전체회원 근태</h2>

      </div>

      <div className='pageAlign'>
        <Table striped bordered hover > {/* Apply table styles */}
          <thead>
            <tr align='center'>
              <th >회원아이디</th>
              <th >이름</th>
              <th >부서</th>
              <th >출퇴근기록</th>
             
            </tr>
          </thead>

          <tbody>
          {pageList.length > 0 &&
            pageList.map((attendance) => (
              <tr key={attendance.id} align='center'>
                <td >{attendance.username}</td>
                <td >{attendance.name}</td>
                <td >{attendance.department}</td>
                <td >{attendance.clickTime}</td>
             

              </tr>
            ))
            }
          </tbody>
        </Table>

        <AttendanceListPaging setFn={setPageList} />


      
      </div>
    </div>
  )
}

export default AttendanceListAll