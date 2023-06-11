import React, { Component,useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route} from "react-router-dom";
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
import MemberContext from './MemberContext';
import Login from './Login';


const LogOutUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/logout';

function BackEndMenu()  {

const [isLogin,setIsLogin]=useState(false)

const logOut=async()=>{
const logOutResult=await axios.get(LogOutUrl,{ withCredentials: true } ,{ timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) })
console.log(logOutResult)
}
    
        return (
            <Container>
                <BrowserRouter>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Navbar.Brand href="#home">商品管理頁面</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="mr-auto">
                            {/* to 路徑對應 Route path */}                            
                            <Nav.Link as={Link} to="/GoodsList">商品列表</Nav.Link>
                            <Nav.Link as={Link} to="/CreateGoods">新增商品</Nav.Link>
                            <Nav.Link as={Link} to="/UpdateGood">商品更新</Nav.Link>
                            <Nav.Link as={Link} to="/SalesReport">銷售報表</Nav.Link>
                            <Nav.Link as={Link} to="/ProductPage">購買頁面</Nav.Link>
                            <Nav.Link as={Link} to="/CartGoods">購物車</Nav.Link>
                        </Nav>   
                        <Button type='submit' onClick={logOut}>登出</Button> 
                    </Navbar.Collapse>
                </Navbar>
                <Routes>
                <Route path="/" element={<Login />} />
                    <Route path="GoodsList" element={<GoodsList />} />
                    <Route path="CreateGoods" element={<CreateGoods />} />
                    <Route path="SalesReport" element={<SalesReport />}/>
                    <Route path="UpdateGood" element={<UpdateGood />}/>
                    <Route path="ProductPage" element={<ProductPage />}/>
                    <Route path="CartGoods" element={<CartGoods />}>
                    </Route>
                </Routes>
            </BrowserRouter>           
                
            <MemberContext.Provider value={isLogin}>
                <h3>上層組件</h3>
                <Login/>
                { isLogin && <div>Some Content</div> }
            </MemberContext.Provider>
            </Container>
        );
    }


export default BackEndMenu;