import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const apiUrl = 'http://localhost:8086/ecommerce/ecommerce/BackendController/queryGoodsData';

class GoodsList extends Component {
    state = {
        goodsID: '',
        goodsName: '',
        startPrice: '',
        endPrice: '',
        quantity: '',
        currentPageNo: 1,
        pageDataSize: '',
        pagesIconSize: '',
        status: '2',
        
        pagination: [{}],
        beverageGoods: [{
            "goodsId": '',
            "goodsName": '',
            "goodsPrice": '',
            "goodsQuantity": '',
            "goodsImageName": '',
            "status": '',
            "description": ''
        }],
        genericPageable: [{
            "currentPageNo": 1,
            "pageDataSize": '',
            "pagesIconSize": '',
            "pagination": [{}],
            "endPage": 1
        }]
    }
    constructor(props) {
        super(props);
        this.clickSearchGoodsList();

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
    clickSearchGoodsList = async (e) => {
        const { currentPageNo, status, goodsName, startPrice, endPrice, goodsID, quantity } = this.state
        const params = { currentPageNo, "pageDataSize": 5, "pagesIconSize": 5, status, goodsName, startPrice, endPrice, goodsID, quantity };
        const goodsdata = await axios.get(apiUrl, { params }).then(rs => rs.data);
        // console.log("data:",data);
        
        console.log("beverageGoods:", goodsdata.beverageGoods);
        console.log("genericPageable:", goodsdata.genericPageable);
        this.setState({
            beverageGoods: goodsdata.beverageGoods,
            genericPageable: goodsdata.genericPageable,
            pagination: goodsdata.genericPageable.pagination
        });
    }
    onChangePage = (e) => {
        this.setState(state=>({
             currentPageNo: e
        }),
            () => {
                this.clickSearchGoodsList();
            });
        console.log(this.state.currentPageNo)
    };
    onChangeGoodsName = (even) => {
        this.setState({
            goodsName: even.target.value
        })
    }
    onChangeGoodsId = (even) => {
        this.setState({
            goodsID: even.target.value
        });
    }
    onChangeStartPrice = (even) => {
        this.setState({
            startPrice: even.target.value
        });
    }
    onChangeEndPrice = (even) => {
        this.setState({
            endPrice: even.target.value
        });
    }
    onChangeQuantity = (even) => {
        this.setState({
            quantity: even.target.value
        });
    }
    onChangeStatus = (even) => {
        this.setState({
            status: even.target.value
        });
    }
    render() {
        const { beverageGoods, pagination, genericPageable, currentPageNo, goodsName, status, startPrice, endPrice, goodsID, quantity } = this.state
       
        return (
            <Container>
           
            <Form.Row>
                <Form.Group as={Col} controlId="formGoodID">
                        <Form.Label>商品編號:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={goodsID} onChange={this.onChangeGoodsId} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGoodsName">
                        <Form.Label>商品名稱:</Form.Label>
                        <Form.Control required type="text" placeholder="" value={goodsName} onChange={this.onChangeGoodsName} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row> 
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGoodsStartPrice">
                        <Form.Label>商品最高價格:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={startPrice} onChange={this.onChangeStartPrice} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGoodsEndPrice">
                        <Form.Label>商品最低價格:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={endPrice} onChange={this.onChangeEndPrice} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row> 
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGoodsQuantity">
                        <Form.Label>商品最少庫存量:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={quantity} onChange={this.onChangeQuantity} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    
                    {/* 商品編號:<input type='number' value={goodsID} onChange={this.onChangeGoodsId}/>&nbsp;
                    商品名稱:<input type='text' value={goodsName} onChange={this.onChangeGoodsName}/>
                    商品最高價格:<input type='number' value={startPrice} onChange={this.onChangeStartPrice}/>&nbsp;
                    商品最低價格:<input type='number' value={endPrice} onChange={this.onChangeEndPrice}/>&nbsp;
                    商品最少庫存量:< input type='number' value={quantity} onChange={this.onChangeQuantity}/> */}
                    
                    <Form.Group as={Col} controlId="formGoodsStatus">
                        <Form.Label>商品狀態:</Form.Label>
                        {/* React Bootstrap下拉選單透過 defaultValue 屬性決定預設值選項,且不行透過傳統 selected 屬姓設置 */}
                        <Form.Control required as="select" defaultValue={status} onChange={this.onChangeStatus}>
                        <option value={2}>請選擇</option>
                        <option value={1}>上架</option>
                        <option value={0}>下架</option>
                        </Form.Control>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>商品排序(價格):</Form.Label>
                        <Form.Control required as="select" defaultValue={''} onChange={this.onChangePriceSort}>
                        <option value={2}>請選擇</option>
                    <option value={1}>升冪</option>
                    <option value={0}>降冪</option>
                        </Form.Control>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group> */}

              </Form.Row>  
                {/* 商品狀態 :   
                <select onChange={this.onChangeStatus}>
                    <option value={''}>請選擇</option>
                    <option value={1}>上架</option>
                    <option value={0}>下架</option>
                </select> */}
                &nbsp;
                <Button variant="primary" onClick={this.clickSearchGoodsList}>查詢</Button>
                <hr />
                <div>
                <table border={'2'}>
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>名稱</th>
                            <th>價格</th>
                            <th>數量</th>
                            <th>描述</th>
                            <th>狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beverageGoods.map(g =>
                            <tr key={g.goodsId}>
                                <td>{`${g.goodsId}`}</td>
                                <td>{`${g.goodsName}`}</td>
                                <td>{`${g.goodsPrice}`}</td>
                                <td>{`${g.goodsQuantity}`}</td>
                                <td>{`${g.description}`}</td>
                                <td>{g.status === '1' ? '上架' : '下架'}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
                </div>
                <hr />
                <div>
                    <tr>
                    <td> {currentPageNo === 1 ?
                        <button disabled={true}>{'<<'}</button> :
                        <button disabled={false} onClick={() => this.onChangePage(1)}>{'<<'}</button>}
                    </td>
                    <td> {currentPageNo === 1 ?
                        <button disabled={true} onClick={() => this.onChangePage(currentPageNo - 1)}>{'<'}</button> :
                        <button disabled={false} onClick={() => this.onChangePage(currentPageNo - 1)}>{'<'}</button>}
                    </td>
                    {pagination.length === 1 ? '' : pagination.map((p,index) =>
                        p === currentPageNo ?
                        
                            <td key={p}><button  disabled={true} onClick={() => this.onChangePage(p)}><u><b>{`${p}`}</b></u></button></td> :
                            <td key={p}><button  disabled={false} onClick={() => this.onChangePage(p)}>{`${p}`}</button></td>
                    )}
                    <td >{currentPageNo >= genericPageable.endPage ?
                        <button disabled={true} onClick={() => this.onChangePage(currentPageNo + 1)}>{'>'}</button> :
                        <button disabled={false} onClick={() => this.onChangePage(currentPageNo + 1)}>{'>'}</button>}
                    </td>
                    <td>{currentPageNo >= genericPageable.endPage ?
                        <button disabled={true} onClick={() => this.onChangePage(genericPageable.endPage)}>{'>>'}</button> :
                        <button disabled={false} onClick={() => this.onChangePage(genericPageable.endPage)}>{'>>'}</button>}
                    </td>
                    </tr>
                </div>
            
            </Container>
        );
       
    }
}



export default GoodsList;