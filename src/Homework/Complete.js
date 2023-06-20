import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Form, Button, Col, Row, Table } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";


function Complete() {
    const location = useLocation();
    const checkOutResult = location.state;
    const [payPrice, setPayprice] = useState()
    useEffect(() => {
        PayPrice(checkOutResult);
    }, [])

    const PayPrice = (() => {
        const totalprice = checkOutResult.orderGoodList.reduce((sum, obj) => sum + obj.goodsQuantity * obj.goodsPrice, 0)
        setPayprice(totalprice)
    })

    return (
        <Container>
            <h4>
                <li>收件人姓名: {checkOutResult.customer.cusName}</li>
                <li>手機號碼: {checkOutResult.customer.mobileNumber}</li>
                <li>收件地址:{checkOutResult.customer.orderAddr}</li>
            </h4>
            <Table responsive>
                <thead >
                    <tr>
                        <th></th>
                        <th></th>
                        <th><h4>購物明細</h4></th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>商品名稱</th>
                        <th>商品價格</th>
                        <th>購買數量</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {checkOutResult.orderGoodList.map((g, index) =>
                        <tr key={g.goodsID}>
                            <td>{index + 1}</td>
                            <td>{g.goodsName}</td>
                            <td>{g.goodsPrice}</td>
                            <td>{g.goodsQuantity}</td>
                        </tr>
                    )}

                </tbody>
            </Table>
            <Row>
                <Col>
                </Col>
                <Col></Col>
                <Col>
                    刷卡金額：{payPrice}
                </Col>
            </Row>




        </Container>
    )
}

export default Complete
