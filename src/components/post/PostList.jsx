import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Table, Row, Col } from 'react-bootstrap';
import '../Pagination.css'
import Pagination from 'react-js-pagination'
import { Link, useLocation, useNavigate} from 'react-router-dom';

const PostList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const search=new URLSearchParams(location.search);
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const navi=useNavigate();

    const getList = async() => {
        setLoading(true);
        const res=await axios(`/posts/list1.json?page=${page}&size=5&key=title&query=`);
        setList(res.data);
        const res1= await axios(`/posts/total?key=title&query=`);
        setTotal(res1.data);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, [location]);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글</h1>
            <Row>
                <Col>
                    <span>게시글수: {total}건</span>
                </Col>
            </Row>
            <Table bordered striped hover>
                <thead>
                    <tr className='text-center'>
                        <td>ID</td><td>제목</td><td>작성자</td><td>작성일</td><td>조회수</td><td>댓글수</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(post=>
                        <tr key={post.pid}>
                            <td>{post.pid}</td>
                            <td><Link to={`/post/read/${post.pid}`}>{post.title}</Link></td>
                            <td>{post.writer}</td>
                            <td>{post.fmtdate}</td><td>{post.viewcnt}</td><td>{post.commcnt}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(page)=>{navi(`/post/list?page=${page}`)}}/>
        </div>
    )
}

export default PostList