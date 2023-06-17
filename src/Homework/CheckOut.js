import React, { useEffect, useState, useRef } from 'react'
import { Container, Form, Button, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const checkOutUrl = 'http://localhost:8086/ecommerce/ecommerce/FrontendController/checkoutGoods';
const clearCartUrl = 'http://localhost:8086/ecommerce/ecommerce/MemberController/clearCartGoods';
const CheckOut = () => {

  const navigate = useNavigate(); 

  const [customer, setCustomer] = useState(
    {
    cusName: '',
    homeNumber: '',
    mobileNumber: '',
    orderAddr: '',
    inputMoney: 0,
    creditCardNo: ['']
  })
  const[checkOutResult,setCheckOutResult]=useState(
    {cusName:'',
    homeNumber:'',
    mobileNumber:'',
    orderAddr:'',
    orderGoodList:
    [{
'goodsId':0,
'goodsName':'',
'goodsQuantity':'',
'goodsPrice':0
    }]}
    )
  const creditRefs = useRef([]);
  // const [inputMoney,setInputMoney]=useState({money:0});
  useEffect(() => {

  }, [])
  const onChangeAddress = (e) => {
    setCustomer((cus) => ({
      ...cus,
      orderAddr: e.target.value
    }))
    console.log(customer)
  }
  const onChangeMobileNumber = (e) => {
    setCustomer((cus) => ({
      ...cus,
      mobileNumber: e.target.value
    }))
    console.log(customer)
  }
  const onChangeCusName = (e) => {
    setCustomer((cus) => ({
      ...cus,
      cusName:e.target.value
    }))
    console.log(customer)
  }
  const onChangeHomeNumber = (e) => {
    
    setCustomer((cus) => ({
      ...cus,
      homeNumber: e.target.value
    }))
    console.log(customer)
  }
  const onSubmitCheckout = async (e) => {
    e.preventDefault();
    console.log(customer)
    const rs = await axios.post(checkOutUrl,  customer, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error:", error) })
    setCheckOutResult(()=>rs)
    console.log("rs",rs)
    console.log("checkOutResult",checkOutResult)
    clearCart(e);
    navigate("/Complete", {state: rs});
  }
  const clearCart = async (e) => {
    e.preventDefault();
    const clearResult = await axios.delete(clearCartUrl, { withCredentials: true }, { timeout: 3000 }).then(rs => rs.data).catch(error => { console.log("error", error) })
    console.log(clearResult);
  }
  const onChangeinputMoney = (e) => {
    setCustomer((cus) => ({
      ...cus,
      inputMoney: e.target.value
    }))
    console.log(customer)
  }
  const onChangeCreditCard = (e) => {
    const {value}=e.target
    customer.creditCardNo[0]=value
   console.log("customer",customer.creditCardNo)
   console.log(value)
   if( value.length == 4){
    setCustomer((cus) => ({
      ...cus,
      creditCardNo:[...cus.creditCardNo]   
    }))
    
    creditRef.current.focus()
  }
  }
  const onChangeCreditCard2 = (e) => {
    const {value}=e.target
    customer.creditCardNo[1]=value
   console.log("customer",customer.creditCardNo)
   console.log(value)
   if( value.length == 4){
    setCustomer((cus) => ({
      ...cus,
      creditCardNo:[...cus.creditCardNo]   
    }))
    
    creditRef1.current.focus()
  }
  }
  const onChangeCreditCard3 = (e) => {
    const {value}=e.target
    customer.creditCardNo[2]=value
   console.log("customer",customer.creditCardNo)
   console.log(value)
   if( value.length == 4){
    setCustomer((cus) => ({
      ...cus,
      creditCardNo:[...cus.creditCardNo]   
    }))
    
    creditRef2.current.focus()
  }
  }
  const onChangeCreditCard4 = (e) => {
    const {value}=e.target
    customer.creditCardNo[3]=value
   console.log("customer",customer.creditCardNo)
   console.log(value)
 
   if( value.length == 4){
    setCustomer((cus) => ({
      ...cus,
      creditCardNo:[...cus.creditCardNo]   
    }))
    
    creditRef3.current.focus()
  }
  }

  const creditRef = useRef();
  const creditRef1 = useRef();
  const creditRef2 = useRef();
  const creditRef3 = useRef();
  return (
    <Container>
      <Form onSubmit={onSubmitCheckout}>
        <Form.Row>
        <Form.Group as={Col} xs={4} controlId="cusName">
          <Form.Label>客戶姓名:</Form.Label>
          <Form.Control required type="text" placeholder="" value={customer.cusName} onChange={onChangeCusName} />
          <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={4} controlId="homeNumber">
          <Form.Label>郵遞區號:</Form.Label>
          <Form.Control required type="text" placeholder="" value={customer.homeNumber} onChange={onChangeHomeNumber} />
          <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={4} controlId="mobileNumber">
          <Form.Label>手機號碼:</Form.Label>
          <Form.Control required type="number" placeholder="" value={customer.mobileNumber} onChange={onChangeMobileNumber} />
          <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} xs={12} controlId="orderAddr">
          <Form.Label>寄件地址:</Form.Label>
          <Form.Control type="text" placeholder="" value={customer.orderAddr} onChange={onChangeAddress} />
          <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        {/* <Form.Row>
        <Form.Group as={Col} xs={12} controlId="inputMoney">
          <Form.Label>投入金額:</Form.Label>
          <Form.Control type="Number" placeholder="" value={customer.inputMoney} onChange={onChangeinputMoney} />
          <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row> */}
        信用卡號:
        <Form.Row>
          <Form.Group as={Col} xs={3} controlId="creditCard-1">
            
            <Form.Control type="Text" placeholder=""  maxLength={4} onChange={onChangeCreditCard} />
            <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="creditCard-2">
            
            <Form.Control type="Text" placeholder="" maxLength={4} ref={creditRef} onChange={onChangeCreditCard2} />
            <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="creditCard-3">
            <Form.Control type="Text" placeholder="" maxLength={4} ref={creditRef1} onChange={onChangeCreditCard3} />
            <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={3} controlId="creditCard-4">   
            <Form.Control type="Text" placeholder="" maxLength={4} ref={creditRef2} onChange={onChangeCreditCard4} />
            <Form.Control.Feedback>欄位正確!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">欄位錯誤!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group as={Col}>
          <Button variant="primary" type="submit" ref={creditRef3} onClick={onSubmitCheckout}>結帳</Button>
        </Form.Group>
      </Form>
      {/* {checkOutResult.orderGoodList.map((rs,index)=><div>{rs.goodsName}</div>)} */}
    </Container>
  )
}

export default CheckOut
