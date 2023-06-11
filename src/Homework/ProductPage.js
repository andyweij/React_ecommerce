import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';

const queryUrl='http://localhost:8086/ecommerce/ecommerce/FrontendController/queryGoodsData';
const addCartUrl='http://localhost:8086/ecommerce/ecommerce/MemberController/addCartGoods';
const clearCartUrl='http://localhost:8086/ecommerce/ecommerce/MemberController/clearCartGoods';

// http://localhost:8086/ecommerce/DrinksImage/
class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,
            currentPageNo:1,
            endPage:0,
            pageDataSize:6,
            pagesIconSize:5,
            goodsImageName:'',
            goodsID:0,
            goodsName:'',
            goodsPrice:0,
            goodsQuantity:0,
            genericPageable: {
                "currentPageNo": 0,
                "endPage": 0,
                "pageDataSize": 0,
                "pagesIconSize": 0,
                "pagination": [{}]
              },
              orderGoodList: [{
                  "description": '',
                  "goodsId": 0,
                  "goodsImageName": '',
                  "goodsName": '',
                  "goodsPrice": 0,
                  "goodsQuantity": 0,
                  "status": ''
                }]       
        }
    }


    componentDidMount() {
        this.goodsList();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
    goodsList=async()=>{
        const{currentPageNo,pageDataSize,pagesIconSize}=this.state
        const params={currentPageNo,pageDataSize,pagesIconSize};
        const goodsdata = await axios.get(queryUrl,{params}).then(rs => rs.data);
        console.log("orderGoodList:", goodsdata);
        this.setState({
            orderGoodList: goodsdata.orderGoodList,
            genericPageable:goodsdata.genericPageable
        });

    };

    onChangeQuantity=(g,n,p,index)=>{
        this.setState({
            show:true,
            goodsID:g,
            goodsName:n,
            goodsPrice:p,
            goodsQuantity:document.getElementsByName("buyQuantity")[index].value
        },()=>{
            this.addGoodsCart();
        })
    }
    addGoodsCart=async()=>{
        const{goodsQuantity,goodsID,goodsName,goodsPrice}=this.state
        
        console.log("goodsID",goodsID)
        console.log("goodsQuantity",goodsQuantity)
        // goodsID=e
        // goodsQuantity= document.getElementsByName("buyQuantity")[index].value
        if(this.state.goodsQuantity!=0||this.state.goodsQuantity!=""){
            const GoodsVo = {goodsID,goodsQuantity,goodsName,goodsPrice}
        const goodsdata = await axios.post(addCartUrl,GoodsVo,{ withCredentials: true }, { timeout: 300000 }).then(rs => rs.data);
        console.log(goodsdata)
        
        }
        
    }
    onChangePage=(e)=>{
this.setState(state=>({
    currentPageNo:e
}),
()=>{this.goodsList();
})}
    handleClose=()=>{
        this.setState({
            show:false
        })
    }
    render() {
        const {orderGoodList,genericPageable,show}=this.state;
        return (
            <Container>
                <Form.Row as={Col} xs={12}>
                {orderGoodList.map((g,index)=>
                
            <CardDeck key={g.goodsId}>
                <Card style={{ width: '18rem' }}>
                
                    <Card.Img variant="top" src={`http://localhost:8086/ecommerce/DrinksImage/${g.goodsImageName}`} />
                    <Card.Body>
                        <Card.Title>{g.goodsName}</Card.Title>
                        <Card.Text>
                        {g.description}
                        </Card.Text>                       
                        <Card.Text>
                        <input type='number' name="buyQuantity" max={g.goodsQuantity} min={0} placeholder='購買數量'></input> / {g.goodsQuantity}瓶
                        </Card.Text>
                        價格：{g.goodsPrice} NT$
                        <Button variant="primary" onClick={()=>this.onChangeQuantity(g.goodsId,g.goodsName,g.goodsPrice,index)}>加入購物車</Button>
                        <Modal show={show} id="myModal" onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    加入購物車！
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                        
                    </Card.Body>                   
                </Card>              
            </CardDeck>
         
            )}
            </Form.Row>

            <Pagination>
                <Pagination.First>{genericPageable.currentPageNo === 1 ?
                        <Button disabled={true}>{'<<'}</Button> :
                        <Button disabled={false} onClick={() => this.onChangePage(1)}>{'<<'}</Button>}</Pagination.First>
                <Pagination.Prev >{genericPageable.currentPageNo === 1 ?
                        <Button disabled={true} onClick={() => this.onChangePage(genericPageable.currentPageNo - 1)}>{'<'}</Button> :
                        <Button disabled={false} onClick={() => this.onChangePage(genericPageable.currentPageNo - 1)}>{'<'}</Button>}</Pagination.Prev>
                {genericPageable.pagination.length === 1 ? '' : genericPageable.pagination.map((p,index) =>
                        p === p.currentPageNo ?
                        
                        <Pagination.Item key={p}><Button  disabled={true} onClick={() => this.onChangePage(p)}>{`${p}`}</Button></Pagination.Item>:
                        <Pagination.Item key={p}><Button  disabled={false} onClick={() => this.onChangePage(p)}>{`${p}`}</Button></Pagination.Item>
                    )}
                <Pagination.Next >{genericPageable.currentPageNo >= genericPageable.endPage ?
                        <Button disabled={true} onClick={() => this.onChangePage(genericPageable.currentPageNo + 1)}>{'>'}</Button> :
                        <Button disabled={false} onClick={() => this.onChangePage(genericPageable.currentPageNo + 1)}>{'>'}</Button>}
                        </Pagination.Next>
                <Pagination.Last >{genericPageable.currentPageNo >= genericPageable.endPage ?
                        <Button disabled={true} onClick={() => this.onChangePage(genericPageable.endPage)}>{'>>'}</Button> :
                        <Button disabled={false} onClick={() => this.onChangePage(genericPageable.endPage)}>{'>>'}</Button>}</Pagination.Last>
            </Pagination>
            </Container>

        );
    }
}

ProductPage.propTypes = {

};

export default ProductPage;