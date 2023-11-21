import axios from 'axios';
import React, { useState } from 'react'
import {Card, InputGroup, Form, Button} from 'react-bootstrap'

const ProfessorUpdate = ({data, setEdit}) => {
    const [form, setForm] = useState(data);
    const {pcode, pname, dept, fmtdate, fmtsalary, title, hiredate, salary} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(window.confirm("변경된 정보를 수정하실래요?")){
            //정보수정
            await axios.post("/pro/update", form);
            alert("변경완료!");
            setEdit(false);
        }
    }
  return (
    <Card className='p-5'>
        <form onSubmit={onSubmit}>
            <InputGroup className='mb-2'>
                <InputGroup.Text>교수번호</InputGroup.Text>
                <Form.Control value={pcode} name='pcode' readOnly/>
            </InputGroup>
            <InputGroup className='mb-2'>
                <InputGroup.Text>교수이름</InputGroup.Text>
                <Form.Control value={pname} name="pname" onChange={onChange}/>
            </InputGroup>
            <InputGroup className='mb-2'>
                <InputGroup.Text>교수학과</InputGroup.Text>
                <Form.Select value={dept} name="dept" onChange={onChange}>
                    <option value="전산">컴퓨터공학과</option>
                    <option value="전자">전자공학과</option>
                    <option value="건축">건축공학과</option>
                </Form.Select>
            </InputGroup>
            <InputGroup className='mb-2'>
                <InputGroup.Text>교수직급</InputGroup.Text>
                <Form.Select value={title} name="title" onChange={onChange}>
                    <option value="정교수">정교수</option>
                    <option value="부교수">부교수</option>
                    <option value="조교수">조교수</option>
                </Form.Select>
            </InputGroup>
            <InputGroup className='mb-2'>
                <InputGroup.Text>교수급여</InputGroup.Text>
                <Form.Control value={salary} name="salary" onChange={onChange}/>
            </InputGroup>
            <InputGroup className='mb-2'>
                <InputGroup.Text>임용일자</InputGroup.Text>
                <Form.Control value={hiredate} type="date" name="hiredate" onChange={onChange}/>
            </InputGroup>
            <div className='text-center mt-3'>
                <Button className='px-5' type="submit">저장</Button>
                <Button className='px-5 ms-2' variant='secondary' onClick={()=>setEdit(false)}>취소</Button>
            </div>
        </form>
    </Card>
  )
}

export default ProfessorUpdate