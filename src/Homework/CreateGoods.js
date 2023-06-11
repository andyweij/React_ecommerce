import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const apiUrl = 'http://localhost:8086/ecommerce/ecommerce/BackendController/createGoods';

class CreateGoods extends Component {   
    constructor(props) {
        super(props);
    this.state = {
        goodsId:0,
        goodsName: '',
        goodsPrice: '',
        goodsQuantity: 0,
        status: '',
        description:'',
        goodsImageName: '',
        fileName:'',
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
}
componentDidMount() {
    
}

componentDidUpdate(prevProps, prevState) {
}

componentWillUnmount() {

}
    onChangeGoodsName=(e)=>{
        
        this.setState({
            goodsName:e.target.value
        });
        console.log("status:",this.state.goodsName);
    };
    onChangeGoodsPrice=(e)=>{
        this.setState({
            goodsPrice:e.target.value
        });
        console.log("goodsPrice:",this.state.goodsPrice);
    }
    onChangeGoodsQuantity=(e)=>{
        this.setState({
            goodsQuantity:e.target.value
        });
        console.log("goodsQuantity",this.state.goodsQuantity);
    }
    onChangeGoodsStatus=(e)=>{
        this.setState({
            status:e.target.value
        });
        console.log("status",this.state.status);
    }
    onChangeDescription=(e)=>{
        this.setState({
            description:e.target.value
        });
    }
    onChangeFile = (e) => {
        this.setState({
            goodsImageName:e.target.files[0].name
        });
    };

    createGoods = async(e)=>{
        e.preventDefault();
        const{goodsName, goodsPrice, goodsQuantity, status,description,goodsID,goodsImageName}=this.state;
        const GoodsVo = new FormData();
        GoodsVo.append("goodsPrice",goodsPrice)
        GoodsVo.append("goodsQuantity",goodsQuantity)
        GoodsVo.append("status",status)
        GoodsVo.append("description",description)
        GoodsVo.append("goodsName",goodsName)
        GoodsVo.append("goodsImageName",goodsImageName)
        const form = e.currentTarget;
        console.log("form.checkValidity():", form.checkValidity());
        GoodsVo.append("file",form.file.files[0]);
        const formResponse = await axios.post(apiUrl,GoodsVo,{ withCredentials: true }, { timeout: 300000 }).then(rs => rs.data);
        console.log("formResponse:", formResponse);
       
    };

    

    render() {
        const {goodsName,goodsPrice,goodsQuantity,status,description,goodsImageName}=this.state;
        return (
            <Container>
                <Form onSubmit={this.createGoods}>
                <Form.Group as={Col} xs={4} controlId="goodsName">
                        <Form.Label>商品名稱:</Form.Label>
                        <Form.Control required type="text" placeholder="" value={goodsName} onChange={this.onChangeGoodsName}/>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="goodsPrice">
                        <Form.Label>商品價格:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={goodsPrice} onChange={this.onChangeGoodsPrice}/>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="goodsQuantity">
                        <Form.Label>商品庫存量:</Form.Label>
                        <Form.Control required type="number" placeholder="" value={goodsQuantity} onChange={this.onChangeGoodsQuantity} />
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>     
                    <Form.Group as={Col} id="goodsStatus">
                    <Form.Check inline required name='radioName' type="radio" label="上架"
                        value={'1'} onChange={this.onChangeGoodsStatus} checked={status === '1'} />
                    <Form.Check inline required name='radioName' type="radio" label="下架"
                        value={'0'} onChange={this.onChangeGoodsStatus} checked={status === '0'} />
                </Form.Group>
                    <Form.Group as={Col} xs={12} controlId="goodsDescription">
                        <Form.Label>商品描述:</Form.Label>
                        <Form.Control  type="text"  placeholder="" defaultValue={description} onChange={this.onChangeDescription}/>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input required name="file" onChange={this.onChangeFile} />
                            <Form.File.Label data-browse="瀏覽">
                                {goodsImageName ? goodsImageName : '選擇要上傳的檔案...'}
                            </Form.File.Label>
                            <Form.Control.Feedback type="valid">已選擇檔案!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">未選擇檔案!</Form.Control.Feedback>
                        </Form.File>
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Button variant="primary" type="submit">新增商品</Button>
                    </Form.Group>
                      </Form>
                </Container>
        );
    }
}

CreateGoods.propTypes = {

};

export default CreateGoods;