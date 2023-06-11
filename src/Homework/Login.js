import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const LoginUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/login';
const checkLoginUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/checkLogin';
const backgroundUrl='http://localhost:8086/ecommerce/DrinksImage/FeHHz_naYAYMYzf.jpg'
function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [MemberInfo, setMemberInfo] = useState({
        cusPassword: '',
        identificationNo: '',
        loginMessage: '',

    })
    useEffect(() => {
        checkLogin(checkLoginUrl)

    }, [])
    const checkLogin = async () => {
        const MemberInfo = await axios.get(checkLoginUrl,{ withCredentials: true } ,{ timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) });

        console.log("LoginInfo", MemberInfo)
    }
    const LoginUser = async(e) => {
        e.preventDefault();
        // const useParam=[MemberInfo.identificationNo,MemberInfo.cusPassword]

        const userInfo = await axios.post(LoginUrl,MemberInfo,{ withCredentials: true },{ timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) });
        console.log(MemberInfo)
        console.log("userInfo",userInfo)
        
    }
    const onChangeUseId = (e) => {
        setMemberInfo(
            i => {
                const userIdval = e.target.value
                console.log(userIdval)
                return ({
                    ...i,
                    identificationNo: userIdval
                })
            })
    }
    const onChangePwd=(e)=>{
        setMemberInfo(
            i => {
                const pwd = e.target.value
                return ({
                    ...i,
                    cusPassword: pwd
                })
            })
    }

    return (
        <Container style={{
            display: 'inline-block',
            
            height: '100%',
            background: `url("${backgroundUrl}") center center / cover no-repeat`,
        }}>
            <Row height='100%'>&nbsp;</Row>
            <Row height='100%'>&nbsp;</Row>
            <Row height='100%'>&nbsp;</Row>
            <Form onSubmit={LoginUser}>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form.Group controlId="formUserID" >
                            <Form.Label>UserID</Form.Label>
                            <Form.Control type="text" placeholder="Enter UserID" onChange={onChangeUseId} />
                            <Form.Label></Form.Label>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onChangePwd}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Button variant="primary" type="submit">
                            登入
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Form>
            <Row height='100%'>&nbsp;</Row>
            <Row height='100%'>&nbsp;</Row>
            <Row height='100%'>&nbsp;</Row>
        </Container>

    )
}

export default Login
