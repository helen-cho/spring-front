import React from "react"
import { useForm } from "react-hook-form"
import { Form, Row, Col, Card, Button } from 'react-bootstrap'

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const onValid = (data) => {
        if(window.confirm("로그인하실래요?")){
            console.log("onValid.....", data);
        }
    }
    const onInvalid=(errors) => {
        console.log("inValid....", errors)
        if(errors.upass){
            alert("비밀번호번호를 입력하세요.");
            errors.upass.ref.focus();
        }else if(errors.uid){
            
        }
    }

    return (
        <div className="my-5">
            <h1 className="text-center">로그인</h1>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-3">
                        <form onSubmit={handleSubmit(onValid, onInvalid)}>
                            <Form.Control className="mb-2"
                                {...register("uid",{
                                    required:{
                                        value: true,
                                        message: "사용자아이디 오류..."
                                    }
                                })}/> 
                            <Form.Control className="mb-2" type="password"
                                {...register("upass",{
                                    required:{
                                        value: true,
                                        message: "사용자비밀번호 오류..."
                                    }
                                })}/>    
                            <Button type="submit" className="w-100 mb-2">로그인</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginForm