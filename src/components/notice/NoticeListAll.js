import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'
import { fetchFn } from '../etc/NetworkUtils';
import { Link } from 'react-router-dom';
import NoticeListPaging from './NoticeListPaging';

function NoticeListAll() {

    const ROLE = localStorage.getItem("ROLE");
    const [notices, setNotices] = useState([]);
    const [pageList, setPageList] = useState([]);



    useEffect(() => {
        fetchFn("GET", "http://localhost:9229/notice/all?pageNum=0", null)//페이징 추가하면서 주소 수정
            .then(data => {
                setPageList(data.content);

            });
    }, []);


    //글번호 내림차순으로 정렬
    const sortedNotices = [...notices].sort((a, b) => b.id - a.id);







    return (

        <div className='pages'>
            <div />
            <div class="header">

                <h2 align='left'>공지사항</h2>

            </div>



            <div className='pageAlign'>

                {/* 회원 권한에 따라 글쓰기 버튼 유무 달라짐 */}
                {ROLE === "0" ? (
                    null
                )
                    :
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                        <Link to="/notice/create">
                            <Button variant="dark" type="submit">글쓰기</Button>
                        </Link>
                    </div>}




                <Table striped bordered hover > {/* Apply table styles */}
                    <thead>

                        <tr align='center'>
                            <th  >글번호</th>
                            <th width="50%" >제목</th>
                            <th >작성자</th>
                            <th >조회수</th>
                            <th width="15%" >작성시간</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pageList.length > 0 &&
                            pageList.map(notice => (

                                // {sortedNotices.map(notice => (
                                <tr key={notice} align='center'>
                                    <td class="vertical-bottom">{notice.id}</td>

                                    <td class="vertical-bottom"><a href={`/notice/detail/${notice.id}`} style={{ textDecoration: 'none' }}>{notice.subject}</a>
                                    </td>
                                    <td class="vertical-bottom">{notice.name}</td>
                                    <td class="vertical-bottom">{notice.readCount}</td>
                                    <td class='small-text'>{notice.updatedDate || notice.createdDate}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>

                <NoticeListPaging setFn={setPageList} />



            </div>
        </div>
    )

}

export default NoticeListAll