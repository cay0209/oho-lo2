import React from 'react'


function AttendanceComp(props) {

  const attendance = props.attendance;



  return (
    <div>

      <tbody>
        <tr>
          <td>{attendance.username}</td>
          <td>{attendance.clickTime}</td>


        </tr>

      </tbody>

    </div>
  )
}

export default AttendanceComp