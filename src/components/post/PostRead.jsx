import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Comment from './Comment'

const PostRead = () => {
    const params=useParams();
    const pid=params.pid;
    const [post, setPost] = useState('');

    const getData = async() => {
        const res=await axios(`/posts/read.json?pid=${pid}`);
        setPost(res.data);
    }

    useEffect(()=>{
        getData();
    }, []);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글정보</h1>
            <Card>
                <Card.Header>
                    [{post.pid}] {post.title}
                </Card.Header>
                <Card.Body>
                    {post.body}
                </Card.Body>
                <Card.Footer>
                    <span>작성일:{post.fmtdate}</span>
                    <span className='ms-3'>작성자:{post.writer}</span>
                </Card.Footer>
            </Card>
            <Comment pid={pid}/>
        </div>
    )
}

export default PostRead