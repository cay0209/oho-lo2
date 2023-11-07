import React, { useEffect, useState } from "react";
import { fetchFn } from "../etc/NetworkUtils";
import { Table } from "react-bootstrap";
import DayoffListPaging from "./DayoffListPaging";

function DayoffListAll(props) {
  const [dayoffs, setDayoffs] = useState([]);
  const [pageList, setPageList] = useState([]);

  // 사용기간의 형태를 "yyyy-MM-dd"로 
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchFn("GET", `http://localhost:9229/dayoff/all?pageNum=0`, null).then(
      (data) => {
        setPageList(data.content);
        setDayoffs(data.content);
        console.log(data)
      }
    );
  }, []);

   //배열을 시간 순서대로 정렬
   const sortedDayoffs = [...dayoffs].sort((a, b) => {
    // 시간 순서대로 정렬
    const timeComparison = new Date(a.timestamp) - new Date(b.timestamp);

    // 시간이 같으면 username을 오름차순으로 정렬
    if (timeComparison === 0) {
      return a.username.localeCompare(b.username);
    }

    return timeComparison;
  });

  return (
    <div className="pages">
      <div />
      <div className="header">
        <h2 align="left">전체회원 연차</h2>
      </div>

      <div className="pageAlign">
        <Table striped bordered hover>
          <thead>
            <tr align="center">
              <th>회원아이디</th>
              <th>이름</th>
              <th>부서</th>
              <th>입사일자</th>
              <th>총 연차</th>
              <th>사용기간</th>
              <th>연차종류</th>
              <th>사용일수</th>
              <th>잔여연차</th>
            </tr>
          </thead>

          <tbody>
            {pageList.length > 0 &&
              pageList.map((dayoff) => (
                <tr key={dayoff.id} align="center">
                  <td>{dayoff.username}</td>
                  <td>{dayoff.name}</td>
                  <td>{dayoff.department}</td>
                  <td>{dayoff.hiredDate}</td>
                  <td>{dayoff.dayoff}</td>
                  <td>{`${formatDateToYYYYMMDD(new Date(dayoff.startDate))} ~ ${formatDateToYYYYMMDD(new Date(dayoff.endDate))}`}</td>
                  <td>{dayoff.type}</td>
                  <td>{dayoff.usedDayoff}</td>
                  <td>{dayoff.remainingDayoff}</td>
                </tr>
              ))}
          </tbody>
        </Table>

        <DayoffListPaging setFn={setPageList} />
      </div>
    </div>
  );
}

export default DayoffListAll;
