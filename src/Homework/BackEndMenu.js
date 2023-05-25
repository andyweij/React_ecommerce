import React, { Component } from 'react';
import { BrowserRouter, Link, Routes, Route} from "react-router-dom";
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
class BackEndMenu extends Component {
    render() {
        return (
            <Container>
                <BrowserRouter>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Navbar.Brand href="#home">商品管理頁面</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="mr-auto">
                            {/* to 路徑對應 Route path */}
                            <Nav.Link as={Link} to="/">App</Nav.Link>
                            <Nav.Link as={Link} to="/GoodsList">商品列表</Nav.Link>
                            <Nav.Link as={Link} to="/CreateGoods">新增商品</Nav.Link>
                            <Nav.Link as={Link} to="/SalesReport">銷售報表</Nav.Link>
                        </Nav>
                       
                    </Navbar.Collapse>
                </Navbar>
                <Routes>
                    <Route path="GoodsList" element={<GoodsList />} />
                    <Route path="CreateGoods" element={<CreateGoods />} />
                    <Route path="SalesReport" element={<SalesReport />}>
                    </Route>
                </Routes>
            </BrowserRouter>
                
            </Container>
        );
    }
}

export default BackEndMenu;