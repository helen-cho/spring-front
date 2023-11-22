import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Route, Routes } from 'react-router-dom';
import StudentList from './student/StudentList';
import LoginForm from './LoginForm';
import ProfessorList from './professor/ProfessorList';
import ProfessorRead from './professor/ProfessorRead';
import ProfessorInsert from './professor/ProfessorInsert';
import PostList from './post/PostList';
import PostRead from './post/PostRead';
import Login from './user/Login';
import { useLocation } from 'react-router-dom';

const NaviPage = () => {
    const location = useLocation();
    const path=location.pathname;
    const onLogout = (e) => {
        e.preventDefault();
        if(window.confirm("로그아웃하실래요?")){
            sessionStorage.clear();
            window.location.href="/";
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark" collapseOnSelect>
                <Container fluid>
                    <Navbar.Brand href="#">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll>
                            <Nav.Link href="/" className={path==="/" && 'active'}>Home</Nav.Link>
                            <Nav.Link href="/pro/list" className={path.indexOf("/pro")!==-1 && 'active'}>교수관리</Nav.Link>
                            <Nav.Link href="/stu/list" className={path.indexOf("/stu")!==-1 && 'active'}>학생관리</Nav.Link>
                            <Nav.Link href="/cou/list" className={path.indexOf("/cou")!==-1 && 'active'}>강좌관리</Nav.Link>
                            <Nav.Link href="/post/list" className={path.indexOf("/post")!==-1 && 'active'}>게시글</Nav.Link>
                        </Nav>
                        <Nav>
                            {sessionStorage.getItem("uid") ?
                                <>
                                    <Nav.Link href="/mypage" className='active'>
                                        {sessionStorage.getItem("uid")}
                                    </Nav.Link>
                                    <Nav.Link href="/logout" onClick={onLogout}>로그아웃</Nav.Link>
                                </>
                                :
                                <Nav.Link href="/login">로그인</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/stu/list" element={<StudentList/>}/>
                <Route path="/pro/list" element={<ProfessorList/>}/>
                <Route path="/pro/read/:pcode" element={<ProfessorRead/>}/>
                <Route path="/pro/insert" element={<ProfessorInsert/>}/>
                <Route path="/post/list" element={<PostList/>}/>
                <Route path="/post/read/:pid" element={<PostRead/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    );
}

export default NaviPage