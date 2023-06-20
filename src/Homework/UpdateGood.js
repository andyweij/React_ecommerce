import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const queryUrl='http://localhost:8086/ecommerce/ecommerce/BackendController/queryAllGoods';
const apiUrl = 'http://localhost:8086/ecommerce/ecommerce/BackendController/updateGoods';
const querygoodUrl='http://localhost:8086/ecommerce/ecommerce/BackendController/queryGoodsByID';

class UpdateGood extends Component {
     
    constructor(props) {
        super(props);
        this.state = {      
            goodsID:0,
            goodsName: '',
            goodsPrice: '0',
            goodsQuantity: 0,
            status: '',
            description:'',
            goodsImageName: '',
            imgUrl: '',
            updateStatus:false,
            updateMsg:'',
            show: false,
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
        this.goodsList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.goodsID !== this.state.goodsID &&this.state.goodsID!==undefined ){
            this.queryGoodsByID(this.state.goodsID);            
        }
        if(prevState.updateStatus!==this.state.updateStatus){
            this.setState({
                updateStatus:false,
                updateMsg:''
            })
            this.queryGoodsByID(this.state.goodsID);
        }
    }

    componentWillUnmount() {

    }

    goodsList = async()=>{
        
        const goodsdata = await axios.get(queryUrl).then(rs => rs.data);
        console.log("beverageGoods:", goodsdata);
        this.setState({
            beverageGoods: goodsdata,
        });
    }

    onChangeGoodsInfo=(e)=>{
        
        this.setState({
            goodsID:e.goodsId,
        });
        console.log("onChangeGoodsInfo",this.state.goodsID)
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
    queryGoodsByID=async(goodsID)=>{
        const params =  {goodsID}
        const goodsdataByID = await axios.get(querygoodUrl,{params}).then(rs => rs.data);
        this.setState({
            goodsName:goodsdataByID.goodsName,
            goodsPrice:goodsdataByID.goodsPrice,
            goodsQuantity:goodsdataByID.goodsQuantity,
            description:goodsdataByID.description,
            status:goodsdataByID.status,         
        });
    }
    updateGoods = async(e)=>{
        e.preventDefault();
        const{goodsName, goodsPrice, goodsQuantity, status,description,goodsID,goodsImageName}=this.state;
        const GoodsVo = new FormData();
        GoodsVo.append("goodsPrice",goodsPrice)
        GoodsVo.append("goodsQuantity",goodsQuantity)
        GoodsVo.append("status",status)
        GoodsVo.append("description",description)
        GoodsVo.append("goodsID",goodsID)
        GoodsVo.append("goodsName",goodsName)
        GoodsVo.append("goodsImageName",goodsImageName)
        const form = e.currentTarget;
        // console.log("file:",form.file.files[0]===undefined)
        // console.log("file:",form.file.files[0])
        {form.file.files[0]!=undefined && GoodsVo.append("file",form.file.files[0])};
        const formResponse = await axios.post(apiUrl,GoodsVo,{ withCredentials: true }, { timeout: 300000 }).then(rs => rs.data);
        if(formResponse.goodsId==goodsID){
        this.setState({
            goodsName:formResponse.goodsName,
            goodsPrice:formResponse.goodsPrice,
            goodsQuantity:formResponse.goodsQuantity,
            description:formResponse.description,
            status:formResponse.status,
            updateStatus:true,
            updateMsg:'更新完成',
            show:true,  
        })
    }
        console.log("formResponse:", formResponse);
    };
    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const {goodsName,goodsPrice,goodsQuantity,status,description,beverageGoods,goodsImageName,show}=this.state;
        return (
            <Container>
                <Form onSubmit={this.updateGoods}> 
                <Form.Group as={Col} xs={4} controlId="goodsName">
                        <Form.Label>商品名稱:</Form.Label>
                        <Form.Control required as="select" defaultValue={goodsName} onChange={(g)=>this.onChangeGoodsInfo(JSON.parse(g.target.value))}>
                        <option value={0}>請選擇</option>
                        {beverageGoods.map(g=>
                        <option key={g.goodsId} value={JSON.stringify(g)}> {`${g.goodsId}:${g.goodsName}`}</option> 
                        )}
                        </Form.Control>                       
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
                    <Form.Group as={Col}id="goodsStatus">
                    <Form.Label>商品狀態：</Form.Label>
                    <Form.Check inline required name='radioName' type="radio" label="上架"
                        value={'1'} onChange={this.onChangeGoodsStatus} checked={status === '1'} />
                    <Form.Check inline required name='radioName' type="radio" label="下架"
                        value={'0'} onChange={this.onChangeGoodsStatus} checked={status === '0'} />
                </Form.Group>
                    <Form.Group as={Col} xs={12} controlId="goodsDescription">
                        <Form.Label>商品描述:</Form.Label>
                        <Form.Control required type="text"  placeholder="" value={description} onChange={this.onChangeDescription}/>
                        <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input  name="file" onChange={this.onChangeFile} />
                            <Form.File.Label data-browse="瀏覽">
                                {goodsImageName ? goodsImageName : '選擇要上傳的檔案...'}
                            </Form.File.Label>
                            <Form.Control.Feedback type="valid">已選擇檔案!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">未選擇檔案!</Form.Control.Feedback>
                        </Form.File>
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                    <Button variant="primary" type="submit">更新</Button>
                    </Form.Group>
                    <Modal show={show} id="myModal" onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            商品更新成功！
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                      </Form>
                </Container>
        );
    }
}

UpdateGood.propTypes = {

};

export default UpdateGood;