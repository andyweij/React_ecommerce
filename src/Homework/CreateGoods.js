import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const apiUrl = 'http://localhost:8086/ecommerce/ecommerce/BackendController/createGoods';

class CreateGoods extends Component {
    state = {
        goodsName: '',
        goodsPrice: '',
        goodsQuantity: '',
        status: '2',
        description:'',
        fileName: '',
        imgUrl: '',
        beverageGoods: [{
            "goodsId": '',
            "goodsName": '',
            "goodsPrice": '',
            "goodsQuantity": '',
            "goodsImageName": '',
            "status": '',
            "description": ''
        }],
    }
    constructor(props) {
        super(props);
        this.goodsNameList();
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    goodsNameList = async()=>{
        const{}=this.state;
        

    }
    render() {
        const {goodsName,goodsPrice,goodsQuantity,status}=this.state;
        return (
            <Container>
                <Form>
                <Form.Group as={Col} xs={4} controlId="formGoodsName">
                        <Form.Label>商品名稱:</Form.Label>
                        <Form.Control required type="text" placeholder="" value={goodsName} onChange={''} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="formGoodsPrice">
                        <Form.Label>商品價格:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={goodsPrice} onChange={''} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="formGoodsQuantity">
                        <Form.Label>商品庫存量:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={goodsQuantity} onChange={''} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                  
                    
                    <Form.Group as={Col} xs={4} controlId="formGoodsStatus">
                        <Form.Label>商品狀態:</Form.Label>
                        {/* React Bootstrap下拉選單透過 defaultValue 屬性決定預設值選項,且不行透過傳統 selected 屬姓設置 */}
                        <Form.Control required as="select" defaultValue={status} onChange={''}>
                        <option value={2}>請選擇</option>
                        <option value={1}>上架</option>
                        <option value={0}>下架</option>
                        </Form.Control>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group as={Col} xs={6}>
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input required name="uploadFile" onChange={''} />
                            <Form.File.Label data-browse="Upload Button">
                                {formParam.fileName ? formParam.fileName : '選擇要上傳的檔案...'}
                            </Form.File.Label>
                            <Form.Control.Feedback type="valid">已選擇檔案!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">未選擇檔案!</Form.Control.Feedback>
                        </Form.File>
                    </Form.Group> */}
                      </Form>
                </Container>
        );
    }
}

CreateGoods.propTypes = {

};

export default CreateGoods;