import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function MyAttendance() {

  const username = useParams().username;
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchFn("GET", `http://localhost:9229/attendance/${username}`, null)
      .then(data => {


        console.log(data)

        setAttendances(data.result)
      })
  }, [username])


  return (
    <div className='pages'>
      <div />
      <div class="header">

        <h2 align='left'>출퇴근기록 확인</h2>

      </div>

      <div className='pageAlign'>

        <Table striped bordered hover > {/* Apply table styles */}
          <thead>
            <tr align='center'>
              <th >출퇴근기록</th>

            </tr>
          </thead>

          <tbody>
            {attendances.map(attendance => (
              <tr key={attendance.id} align='center'>
                <td >{attendance.clickTime}</td>


              </tr>
            ))}
          </tbody>
        </Table>




      </div>

    </div>
  )
}

export default MyAttendance