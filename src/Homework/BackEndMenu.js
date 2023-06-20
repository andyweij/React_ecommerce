import React, { Component, useContext, useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import CreateGoods from './CreateGoods';
import GoodsList from './GoodsList';
import SalesReport from './SalesReport';
import UpdateGood from './UpdateGood';
import ProductPage from './ProductPage';
import CartGoods from './CartGoods';
import CheckOut from './CheckOut';
import Complete from './Complete';
import checkContext,{ Provider } from './MemberContext';

import Login from './Login';

const LogOutUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/logout';
const checkLoginUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/checkLogin';
const clearCartUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/clearCartGoods';


const BackEndMenu = () => {
    const [isLogin, setIsLogin] = useState({
        isLogin: false,
        customerName:''
    })

  

//     const checkResult=(rs)=>{
// console.log("rs",rs)
//         navigate("/Complete",{state:rs})

//     }
    // const checkOutValue={checkResult};
    const navigate = useNavigate();//主動觸發 react-router-dom 頁面跳轉功能
    const logOut = async (e) => {
        clearCart(e);
        const logOutResult = await axios.get(LogOutUrl, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) })
        setIsLogin(i => ({
            isLogin: logOutResult.isLogin
        }))
        navigate("/ProductPage")

    }
    useEffect(() => {
        checkLogin(checkLoginUrl)
        // navigate("/ProductPage")
    }, [])
    const checkLogin = async () => {
        const loginInfo = await axios.get(checkLoginUrl, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) });
        setIsLogin(i => ({
            ...i,
            isLogin: loginInfo.isLogin,
            customerName:loginInfo.customerName
        }))
        console.log("LoginInfo", loginInfo)
    }
    const setLoginData = (updatelogin) => {
        setIsLogin(i => ({
            isLogin: updatelogin.isLogin,
            customerName:updatelogin.customerName
        }))
        console.log("setLoginData")
    }
    const userLoginData = { setLoginData }
    const clearCart = async (e) => {
        e.preventDefault();
        const clearResult = await axios.delete(clearCartUrl, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error", error) })
        console.log(clearResult);
      }
    return (
        
        <Container>
            
           {isLogin.isLogin &&  <Navbar bg="dark" variant={"dark"} expand="lg">
           <Navbar.Brand > {`歡迎！${isLogin.customerName}`} </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/ProductPage">購物網-商品架</Nav.Link>
                    <NavDropdown title="系統維護" id="basc-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/GoodsList">商品列表</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/CreateGoods">新增商品</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/UpdateGood">商品更新</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/SalesReport">銷售報表</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/CartGoods">購物車</Nav.Link>
                    </Nav>
                    {isLogin.isLogin ? <Button type='submit' onClick={logOut}>登出</Button> : <Button disabled type='submit' onClick={logOut}>登出</Button>}
                        
                </Navbar.Collapse>
            </Navbar>
            }
            <Routes>
                <Route path="/" element={<Login props={userLoginData} />} />
                <Route path="GoodsList" element={isLogin.isLogin ? <GoodsList /> : <Login props={userLoginData} />} />
                <Route path="CreateGoods" element={isLogin.isLogin ? <CreateGoods /> : <Login props={userLoginData} />} />
                <Route path="SalesReport" element={isLogin.isLogin ? <SalesReport /> : <Login props={userLoginData} />} />
                <Route path="UpdateGood" element={isLogin.isLogin ? <UpdateGood /> : <Login props={userLoginData} />} />
                <Route path="ProductPage" element={isLogin.isLogin ?<ProductPage/> : <Login props={userLoginData} />} />
                <Route path="CartGoods" element={isLogin.isLogin ? <CartGoods /> : <Login props={userLoginData} />}/>
                <Route path="Complete" element={isLogin.isLogin ? <Complete /> : <Login props={userLoginData} />}/>
                <Route path="CheckOut" element={isLogin.isLogin ?  <CheckOut /> : <Login props={userLoginData} />}>
                </Route>
            </Routes>
        </Container>
    );
}


export default BackEndMenu;