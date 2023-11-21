import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Spinner, Table, Row, Col, Button } from 'react-bootstrap'
import '../Pagination.css'
import Pagination from 'react-js-pagination'

const ProfessorList = () => {
    const location = useLocation();
    const navi = useNavigate();
    const search=new URLSearchParams(location.search);
    const query=search.get("query") ? search.get("query") : "";
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const key=search.get("key") ? search.get("key") :"pcode";
    const size=3;

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const getList = async() => {
        setLoading(true);
        const res=await axios.get(`/pro/slist.json?page=${page}&size=${size}&key=${key}&query=${query}`);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    },[location]);

    const onClickRow = (pcode) => {
        navi(`/pro/read/${pcode}`);
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수목록</h1>
            <Row className='mb-2'>
                <Col>
                    <span>검색수:{total}명</span>
                </Col>
                <Col className='text-end'>
                    <Link to="/pro/insert">
                        <Button>교수등록</Button>
                    </Link>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>교수번호</td><td>교수이름</td><td>교수학과</td>
                        <td>임용일자</td><td>교수급여</td><td>교수직급</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                    <tr key={p.pcode} className='text-center' 
                            onClick={()=>onClickRow(p.pcode)} style={{cursor:'pointer'}}>
                        <td>{p.pcode}</td><td>{p.pname}</td><td>{p.dept}</td>
                        <td>{p.fmtdate}</td><td>{p.fmtsalary}</td><td>{p.title}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            {total > size && 
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page)=>{navi(`/pro/list?page=${page}&query=${query}&key=${key}&size=${size}`)}}/>
                }
        </div>
    )
}

export default ProfessorList