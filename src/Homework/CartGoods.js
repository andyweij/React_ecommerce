import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Col, Row ,Table} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
axios.defaults.withCredentials=true;

const cartGoodsUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/queryCartGoods';
const checkOutUrl = 'http://localhost:8086/ecommerce/ecommerce/FrontendController/checkoutGoods';
const clearCartUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/clearCartGoods';

function CartGoods() {
    const[cartGoodsInfo , setCartGoodsInfo]=useState(
        [{
        description: '',
        goodsID: 0,
        goodsImageName:'', 
        goodsName: '',
        goodsPrice: 0,
        goodsQuantity: 0,
        status: ''
        }]
    )

    useEffect(()=>{
        queryCartGoods(cartGoodsUrl);
    },[]
    )

    const queryCartGoods=async(cartGoodsUrl)=>{
        const goodsInfo = await axios.get(cartGoodsUrl, { withCredentials: true },{ timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) });
        console.log("GoodsInfo:", goodsInfo)
        setCartGoodsInfo(()=>[...goodsInfo])
        console.log("cartGoodsInfo:", cartGoodsInfo)
    }
    const onChaneQuantity=(index , e)=>{
      
      console.log("e:", e.target.value)
      cartGoodsInfo[index].goodsQuantity=e.target.value;
      console.log("cartGoodsInfo:", cartGoodsInfo[index])
      const updateGood={...cartGoodsInfo[index]};
      const updateGoodsQuantity=[...cartGoodsInfo]
      updateGoodsQuantity[index]=updateGood;
      setCartGoodsInfo(    
        updateGoodsQuantity
      )
    }
    const checkOut=async(e)=>{
      e.preventDefault();
      const checkOutResult=await axios.post(checkOutUrl,{ withCredentials: true },{ timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) })
      console.log(checkOutResult)
    }

    const clearCart=async(e)=>{
      e.preventDefault();
      const clearResult=await axios.delete(clearCartUrl,{ withCredentials:true },{ timeout:3000 }).then(rs=>rs.data).catch(error=>{console.log("error",error)})
      console.log(clearResult);
    }
  return (
    
    <Container>
      <Form  onSubmit={checkOut}> 
<Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>商品名稱</th>
        <th>商品價格</th>
        <th>購買數量</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {cartGoodsInfo.map((g,index)=>
      <tr key={g.goodsID}>
        <td>{index+1} </td>
        <td>{g.goodsName}</td>
        <td>{g.goodsPrice}</td>
        <td><input type='number'  value={g.goodsQuantity} onChange={(e)=>{onChaneQuantity(index,e)}}></input></td>
      </tr>
      )}      
    </tbody>
  </Table>
<Row>
  <Col>
  <Button variant="outline-secondary" onClick={clearCart}>清空購物車</Button>
  </Col>
  <Col></Col>
  <Col>
<Button type='submit'>結帳</Button>
</Col>
</Row>
</Form>
    </Container>
  )
}

export default CartGoods
