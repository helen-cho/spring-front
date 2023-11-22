import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import Pagination from 'react-js-pagination'

const Comment = ({pid}) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [body, setBody] = useState("");
    const size=3;

    const getList = async() => {
        const res = await axios(`/comments/list.json?page=${page}&pid=${pid}&size=${size}`);
        const data=res.data.map(c=>c && {...c, ellipsis:true, view:true, text:c.body});
        console.log(data);
        setList(data);
        const res1= await axios(`/comments/total?pid=${pid}`);
        setTotal(res1.data);
    }

    useEffect(()=>{
        getList();
    }, [page]);

    const onLogin = () => {
        sessionStorage.setItem("target", `/post/read/${pid}`);
        window.location.href="/login";
    }

    const onRegister = async() => {
        if(body==""){
            alert("댓글내용을 입력하세요!");
        }else{
            const data={pid, writer:sessionStorage.getItem("uid"), body};
            await axios.post("/comments/insert", data);
            setBody("");
            getList();
        }
    }

    const onClickBody = (cid) => {
        const data=list.map(c=>c.cid===cid ? {...c, ellipsis:!c.ellipsis} : c);
        setList(data);
    }

    const onDelete = async(cid) => {
        if(window.confirm(`${cid}번 댓글을 삭제하실래요?`)){
            await axios(`/comments/delete?cid=${cid}`);
            getList();
        }
    }

    const onClickUpdate = (cid)=> {
        const data=list.map(c=>c.cid===cid ? {...c, view:false} : c);
        setList(data);
    }

    const onClickCancel = (cid) => {
        const data=list.map(c=>c.cid===cid ? {...c, view:true, body:c.text} : c);
        setList(data);
    }

    const onChangeBody = (cid, e) => {
        const data=list.map(c=>c.cid===cid ? {...c, body:e.target.value} : c);
        setList(data);
    }

    const onClickSave = async(cid, body, text) => {
        const data={cid, body};
        if(body==text){
            onClickCancel(cid);
        }else{
            if(window.confirm(`${cid}번 댓글을 수정하실래요?`)){
                await axios.post("/comments/update", data);
                getList();
            }
        } 
    }

    return (
        <div className='mt-5'>
            <div className='mb-2'><span>댓글수:{total}</span></div>
            {sessionStorage.getItem("uid") ?
                <div className='mb-5'>
                    <Form.Control as="textarea" onChange={(e)=>setBody(e.target.value)}
                        rows={5} placeholder='내용을 입력하세요.' value={body}/>
                    <div className='text-end mt-2'>
                        <Button className='px-5' onClick={onRegister}>등록</Button>
                    </div>
                </div>
                :
                <Button className='w-100 mb-5' onClick={onLogin}>로그인</Button>
            }
            {list.map(com=>
            <div key={com.cid}>
                <Row className='mb-3'>
                    <Col xs="2" sm="2" md="2" lg="1">
                        <img src={com.photo?`/display?file=${com.photo}`:"http://via.placeholder.com/50x50"} width="50px" className='photo'/>
                        <div><small>{com.uname}</small></div>
                    </Col>
                    <Col>
                        <div><small>{com.fmtdate}</small></div>
                        {com.view ? 
                            <div>
                                <div onClick={()=>onClickBody(com.cid)} 
                                    className={com.ellipsis && "ellipsis2"} style={{cursor:'pointer'}}>
                                    [{com.cid}] {com.text}
                                </div>
                                {sessionStorage.getItem("uid")===com.writer &&
                                    <div className='text-end'>
                                        <Button className='btn-sm' onClick={()=>onClickUpdate(com.cid)}>수정</Button>
                                        <Button onClick={()=>onDelete(com.cid)}
                                            className='btn-sm ms-2' variant='danger'>삭제</Button>
                                    </div>
                                }
                            </div>    
                            :
                            <div>   
                                <Form.Control onChange={(e)=>onChangeBody(com.cid, e)}
                                    as="textarea" rows="5" value={com.body}></Form.Control>
                                <div className='text-end mt-2'>
                                    <Button onClick={()=>onClickSave(com.cid, com.body, com.text)}
                                        className='btn-sm'>저장</Button>
                                    <Button onClick={()=>onClickCancel(com.cid)}
                                        className='btn-sm ms-2' variant='secondary'>취소</Button>
                                </div>
                            </div>
                        }
                    </Col>
                </Row>
                <hr className='line'/>
            </div>    
            )}
            {total > size && 
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page)=>{setPage(page)}}/>
            }    
        </div>
    )
}

export default Comment