import React, { useEffect, useState } from "react";
import { fetchFn } from "../etc/NetworkUtils";
import { Pagination } from "react-bootstrap";

function MemberListPaging(props) {
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  function onClickHandler(pageNum) {
    fetchFn("GET", `http://localhost:9229/members/all?pageNum=${pageNum - 1}`).then(
      (data) => {
        console.log(data.content)
        console.log(data.number)
        console.log(data.totalPages)

        props.setFn(data.content);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      }
    );
  }

  let pagingArr = [];
  if (totalPages !== undefined) {
    for (let i = pageStart; i < pageStart + 10 && i <= totalPages; i++) {
      pagingArr.push(i);
    }
  }

  function getPageNumInfo() {
    fetchFn("GET", `http://localhost:9229/members/all?pageNum=0`).then((data) => {
        console.log(data)

      setTotalPages(data.totalPages);
    });
  }
  useEffect(getPageNumInfo, []);

  return (
    <div className="d-flex justify-content-center">
      {totalPages !== undefined && (
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 0}
            onClick={() => onClickHandler(currentPage)}
          />

          {pagingArr.map((pageNum) => (
            <Pagination.Item
              key={pageNum}
              active={currentPage + 1 === pageNum}
              onClick={() => onClickHandler(pageNum)}
            >
              {pageNum}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage + 1 === totalPages}
            onClick={() => onClickHandler(currentPage + 2)}
          />
        </Pagination>
      )}
    </div>
  );
}

export default MemberListPaging;
