import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Spinner, Table, Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import { useNavigate, useLocation } from 'react-router-dom'
import '../Pagination.css'

const StudentList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const navi = useNavigate();
    const location=useLocation();
    
    const search=new URLSearchParams(location.search);
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const size=3;
    const [key, setKey] = useState(search.get("key")?search.get("key"):"sname");
    const [query, setQuery] = useState(search.get("query") ? search.get("query"): "");

    const getList = async() => {
        setLoading(true);
        const res=await axios.get(`/stu/list.json?page=${page}&key=${key}&query=${query}&size=${size}`);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, [location]);

    const onChangePage = (page)=> {
        navi(`/stu/list?page=${page}&key=${key}&query=${query}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/stu/list?page=1&key=${key}&query=${query}`);
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>학생목록</h1>
            <Row className='mb-2'>
                <Col>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select onChange={(e)=>setKey(e.target.value)}>
                                <option value="sname" selected={key==="sname" && true}>학생이름</option>
                                <option value="scode"  selected={key==="scode" && true}>학생번호</option>
                                <option value="pname" selected={key==="pname" && true}>지도교수</option>
                                <option value="dept"  selected={key==="dept" && true}>학생학과</option>
                            </Form.Select>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)}
                                placeholder='검색어' className='ms-2' value={query}/>
                            <Button>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <span>검색수:{total}명</span>
                </Col>
            </Row>
            {total > 0 ?
                <Table striped hover bordered>
                    <thead>
                        <tr className='text-center'>
                            <td>학번</td><td>이름</td><td>학과</td><td>지도교수</td>
                            <td>생년월일</td><td>학년</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(s=>
                            <tr key={s.scode} className='text-center'>
                                <td>{s.scode}</td><td>{s.sname}</td><td>{s.dept}</td>
                                <td>{s.pname}</td><td>{s.birthday}</td><td>{s.year}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                :
                <div className='text-center my-5'><h3>검색자료가없습니다.</h3></div>
            }
            {total > size && 
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage}/>
                }
        </div>
    )
}

export default StudentList