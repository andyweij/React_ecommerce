import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Col, Row, Table } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import CheckOut from './CheckOut';
axios.defaults.withCredentials = true;

const cartGoodsUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/queryCartGoods';
const checkOutUrl = 'http://localhost:8086/ecommerce/ecommerce/FrontendController/checkoutGoods';
const clearCartUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/clearCartGoods';

function CartGoods() {
  const [cartGoodsInfo, setCartGoodsInfo] = useState(
    [{
      description: '',
      goodsID: 0,
      goodsImageName: '',
      goodsName: '',
      goodsPrice: 0,
      goodsQuantity: 0,
      status: ''
    }]
  )
const [payprice,setPayprice]=useState()
  useEffect(() => {
    queryCartGoods(cartGoodsUrl);
  }, []
  )

  const queryCartGoods = async (cartGoodsUrl) => {
    const goodsInfo = await axios.get(cartGoodsUrl, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) });
    console.log("GoodsInfo:", goodsInfo)
    setCartGoodsInfo(() => goodsInfo)
    const totalprice=goodsInfo.reduce((sum,obj)=>sum+obj.goodsQuantity*obj.goodsPrice,0)
    setPayprice(totalprice)
    
    console.log("payprice:", payprice)
    console.log("totalprice:", totalprice)    
  }
  // const TotalPriceValue=((goodsPriceArr)=>{
  //   console.log("goodsPriceArr",goodsPriceArr)
  //   setTotalprice(goodsPriceArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
  // })
  const onChaneQuantity = (index, e) => {
    cartGoodsInfo[index].goodsQuantity = e.target.value;
    const updateGood = { ...cartGoodsInfo[index] };
    const updateGoodsQuantity = [...cartGoodsInfo]
    updateGoodsQuantity[index] = updateGood;
    setCartGoodsInfo(
      updateGoodsQuantity
    )
  }


  const clearCart = async (e) => {
    e.preventDefault();
    const clearResult = await axios.delete(clearCartUrl, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error", error) })
    console.log(clearResult);
  }
  return (

    <Container>
      <Form >
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
            {cartGoodsInfo.map((g, index) =>
              <tr key={g.goodsID}>
                <td>{index + 1}</td>
                <td>{g.goodsName}</td>
                <td>{g.goodsPrice}</td>
                <td><input type='number' value={g.goodsQuantity} onChange={(e) => { onChaneQuantity(index, e) }}></input></td>
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
          總金額：{payprice}
          </Col>
        </Row>
        <CheckOut/>
      </Form>
    </Container>
  )
}

export default CartGoods
