import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import MemberCreate from './components/members/MemberCreate';
import EmptyPage from './components/etc/EmptyPage';
import Main from './components/etc/Main';
import MemberDelete from './components/members/MemberDelete';
import MemberDetail from './components/members/MemberDetail';
import MemberUpdate from './components/members/MemberUpdate';
import MemberList from './components/members/MemberList';
import MemberLogin from './components/members/MemberLogin';
import AttendanceMain from './components/attendance/AttendanceMain';
import MyAttendance from './components/attendance/MyAttendance';
import AttendanceListAll from './components/attendance/AttendanceListAll';
import MyDayoff from './components/dayoff/MyDayoff';
import DayoffCreate from './components/dayoff/DayoffCreate';
import DayoffListAll from './components/dayoff/DayoffListAll';

import logo from './components/image/logo.png'
import MemberLogout from './components/members/MemberLogout';
import NoticeCreate from './components/notice/NoticeCreate';
import NoticeUpdate from './components/notice/NoticeUpdate';
import NoticeDetail from './components/notice/NoticeDetail';
import NoticeListAll from './components/notice/NoticeListAll';


function App() {
  // 로그인 요청할 때, 기존 로그인과 관련된 토큰 초기화
  // localStorage.setItem("BTOKEN", null);

  const username = localStorage.getItem("LOGINER");
  const name = localStorage.getItem("NAME");

  const ROLE = localStorage.getItem("ROLE");
  const id = localStorage.getItem("id");
  



  return (
    <div className='App'>
      {/* 헤더 */}
      <header>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="150"
                height="60"
                className="d-inline-block align-top"
                alt="logo"
              />

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

              <Nav className="me-auto" >
                
              </Nav>

              <Nav>
                {/* 로그인 정보 있으면 */}
                {username === "null" ?
                  (
                    <>
                      <Nav.Link href="/auth/create" style={{ fontWeight: 'bold' }}>회원가입</Nav.Link>
                      <Nav.Link href="/auth/login" style={{ fontWeight: 'bold' }}>로그인</Nav.Link>


                    </>
                  ) : (
                    <>
                      <span class="vertical-bottom2" style={{ fontWeight: 'bold' }}>{name}</span><p class="vertical-bottom2" >님, 환영합니다.</p>

                      <Nav.Link href='/members/logout' style={{ fontWeight: 'bold'}}> 로그아웃 </Nav.Link>
                    </>
                  )


                }

              </Nav>

            </Navbar.Collapse>
          </Container>


        </Navbar>

      </header >


      {/* <!-- Begin Page Content --> */}
                <div class="container-fluid">

                

                </div>
                {/* <!-- /.container-fluid --> */}
     


      {/* 사이드바 */}
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
              {username === "null" ?
                <div>
                  <p></p>
                  <div class="logincheckbox" >
                  <p>   로그인 후 이용가능합니다.</p>
                  </div>
                </div>
                :
                <div className="nav flex-column">
                  <div class="nav">
                    {/* <div class="sb-sidenav-footer">
                  {LOGINER === "null" ? 
                  <MemberRoleCheck/> :
                    <div class="small">{LOGINER}님, 환영합니다.</div>
                  }
                  </div> */}

                    {/* < MemberLogin/> */}

                    <div class="sb-sidenav-menu-heading">공지</div>

                    <a class="nav-link" href={`/notice/all`}>
                      <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                      공지사항
                    </a>

                    {/* {ROLE === "1" ? (<a class="nav-link" href="/notice/create">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      공지 작성
                    </a>) : null} */}

                    




                    <div class="sb-sidenav-menu-heading">회원</div>
                    <a class="nav-link" href={`/members/detail/${username}`}>
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      내정보
                    </a>

                    {/* <a class="nav-link" href="/members/update">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      정보수정
                    </a> */}

                    {/* <a class="nav-link" href="/members/delete">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      회원탈퇴
                    </a> */}


                    {/* {ROLE === "1" && (
                        <Nav.Link href="/member-service/list">
                          <strong>회원 목록</strong>
                        </Nav.Link>
                      )} */}

                    {ROLE === "1" ? (<a class="nav-link" href="/members/all">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      전체회원목록
                    </a>) : null}

                    <div class="sb-sidenav-menu-heading">근태</div>
                    <a class="nav-link collapsed" href="/attendance" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                      <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                      출퇴근기록
                      <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>

                    <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                      <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="layout-static.html">Static Navigation</a>
                        <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                      </nav>
                    </div>

                    <a class="nav-link collapsed" href={`/attendance/${username}`} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                      <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                      출퇴근기록확인
                      <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>

                    <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                      <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="layout-static.html">Static Navigation</a>
                        <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                      </nav>
                    </div>

                    {ROLE === "1" ? (<a class="nav-link" href="/attendance/all">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      전체회원근태
                    </a>) : null}



                    <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                      <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="layout-static.html">Static Navigation</a>
                        <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                      </nav>
                    </div>

                    {/* <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                      <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                      Pages
                      <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a> */}
                    <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                      <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                          Authentication
                          <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                          <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="login.html">Login</a>
                            <a class="nav-link" href="register.html">Register</a>
                            <a class="nav-link" href="password.html">Forgot Password</a>
                          </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                          Error
                          <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                          <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="401.html">401 Page</a>
                            <a class="nav-link" href="404.html">404 Page</a>
                            <a class="nav-link" href="500.html">500 Page</a>
                          </nav>
                        </div>
                      </nav>
                    </div>
                    <div class="sb-sidenav-menu-heading">연차</div>

                    <a class="nav-link" href={`/dayoff/${username}`}>
                      <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                      연차확인
                    </a>
                    <a class="nav-link" href="/dayoff/create">
                      <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                      연차상신
                    </a>

                    {ROLE === "1" ? (<a class="nav-link" href="/dayoff/all"  >
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      전체회원연차
                    </a>) : null}
                  </div>
                </div>
              }
            </div>
          </nav>
        </div>

           

        {/* 라우터 */}
        <BrowserRouter>


          <Routes>

            {/* 라우터 v6부터는 component -> element로 변경. 형식은 아래와 같음
          <Route path="/example" element={<ExampleComponent />} /> */}

            {/* 라우터에서, 동적 경로 매개변수는 {}말고 :사용 */}
            <Route path='/' element={<Main />} />

            <Route path="/auth/create" element={<MemberCreate />} />
            <Route path="/members/detail/:username" element={<MemberDetail />} />
            <Route path="/members/update" element={<MemberUpdate />} />
            <Route path="/members/delete" element={<MemberDelete />} />
            <Route path="/members/all" element={<MemberList />} />

            <Route path="/auth/login" element={<MemberLogin />} />
            <Route path="/members/logout" element={<MemberLogout />} />



            <Route path='/attendance' element={<AttendanceMain />} />
            <Route path="/attendance/:username" element={<MyAttendance />} />
            <Route path='/attendance/all' element={<AttendanceListAll />} />


            <Route path='/dayoff/create' element={<DayoffCreate />} />
            <Route path='/dayoff/:username' element={<MyDayoff />} />
            <Route path='/dayoff/all' element={<DayoffListAll />} />

            <Route path='/notice/create' element={<NoticeCreate />} />
            <Route path='/notice/detail/:id' element={<NoticeDetail />} />
            <Route path='/notice/update' element={<NoticeUpdate />} />
            {/* <Route path='/notice/delete' element={<NoticeDelete />} /> */}
            <Route path='/notice/all' element={<NoticeListAll />} />
            




            {/* /* : 선언된 것 외의 주소가 입력되는 */}
            <Route path="/*" element={<EmptyPage />} />

          </Routes>



        </BrowserRouter>


      </div >

    </div>


  );
}

export default App;