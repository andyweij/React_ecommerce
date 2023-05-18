import React, { Component } from 'react';
import axios from "axios";

const apiUrl = 'http://localhost:8086/ecommerce/ecommerce/BackendController/queryGoodsSalesDAO';

class SalesReport extends Component {
    state = {
        startDate:'',
        endDate:'',
        currentPageNo:'1',
        pagination:[{}],
        goodsReportSalesList:[{
        "orderId": '',
        "orderDate":'',
        "goodsBuyPrice":'',
        "buyQuantity":'',
        "goodId":'',
        "customerName":'',
        "goodsName":''
    }],
    genericPageable:[{
        "currentPageNo":'',
        "pageDataSize":'',
        "pagesIconSize":'',
        "pagination":[{}],
        "endPage":''
}]
}
onChangeStartDate = (e) => {
    
    this.setState({
        startDate: e.target.value,
        currentPageNo:1
    });
    
};

onChangeendDate=(e) => {    
    this.setState({
        endDate: e.target.value,
        currentPageNo:1
    });   
};
onChangePage=(e) => {    
    this.setState({
        currentPageNo:e
    },  
    () => {
        this.onClickSearch();
    });
    console.log(this.state.currentPageNo)
};

    onClickSearch = async () => {
        
        const{startDate,endDate,currentPageNo}=this.state
        
        const params =  { currentPageNo, "pageDataSize": 5, "pagesIconSize": 5,startDate, endDate };
        const reportData = await axios.get(apiUrl, { params })
            .then(rs => rs.data)
            .catch(error => { console.log(error); });
        
        console.log("goodsReportSalesList:", reportData.goodsReportSalesList);
        console.log("genericPageable:", reportData.genericPageable);
        this.setState({
            goodsReportSalesList:reportData.goodsReportSalesList,
            genericPageable:reportData.genericPageable,
            pagination:reportData.genericPageable.pagination
        })
        console.log(this.state.goodsReportSalesList)
        console.log(this.state.genericPageable)
        console.log(this.state.pagination[0])
    };

    render() {
        const{
            goodsReportSalesList,startDate,endDate,pagination,currentPageNo,genericPageable
        }=this.state;
        return (
            <div>
                <label>查詢日期起：</label> <input type='date' onChange={this.onChangeStartDate}/>{startDate}
                <label style={{ marginLeft: '20px' }} />
                <label>查詢日期迄：</label> <input type='date' onChange={this.onChangeendDate}/>{endDate}
                <label style={{ marginLeft: '20px' }} />
                <button onClick={this.onClickSearch}>查詢</button>
                <hr />
                <table border={'2'}>
                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>購買日期</th>
                            <th>顧客姓名</th>
                            <th>商品編號</th>
                            <th>商品名稱</th>
                            <th>商品價格</th>
                            <th>購買數量</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        { goodsReportSalesList.map( g=>
                        
                        <tr key={g.orderId}>                           
                            <td>{`${g.orderId}`}</td>
                            <td>{`${g.orderDate}`}</td>
                            <td>{`${g.customerName}`}</td>
                            <td>{`${g.goodId}`}</td>
                            <td>{`${g.goodsName}`}</td>
                            <td>{`${g.goodsBuyPrice}`}</td>
                            <td>{`${g.buyQuantity}`}</td>
                         </tr>
                         )}
                    </tbody>
                </table>
                <hr/>                
                <div>
                <td> {currentPageNo===1 ? 
                <button disabled={true}>{'<<'}</button>:
                <button disabled={false} onClick={()=>this.onChangePage(1)}>{'<<'}</button>}
                </td>
                <td> {currentPageNo===1 ? 
                <button disabled={true} onClick={()=>this.onChangePage(currentPageNo-1)}>{'<'}</button>:
                <button disabled={false} onClick={()=>this.onChangePage(currentPageNo-1)}>{'<'}</button>  }
                </td>               
                            {pagination.length===1 ? '' :pagination.map((p)=>
                            p===currentPageNo ? 
                            <td key={p.index}><button disabled={true} onClick={()=>this.onChangePage(p)} ><u><b>{`${p}`}</b></u></button></td>:
                            <td key={p.index}><button disabled={false} onClick={()=>this.onChangePage(p)} >{`${p}`}</button></td>
                         )}
                <td>{currentPageNo===genericPageable.endPage ? 
                <button disabled={true} onClick={()=>this.onChangePage(currentPageNo+1)}>{'>'}</button>:
                <button disabled={false} onClick={()=>this.onChangePage(currentPageNo+1)}>{'>'}</button>}
                </td>
                <td>{currentPageNo===genericPageable.endPage ? 
                <button disabled={true} onClick={()=>this.onChangePage(genericPageable.endPage)}>{'>>'}</button>:
                <button disabled={false} onClick={()=>this.onChangePage(genericPageable.endPage)}>{'>>'}</button> }
                </td>
                </div>    
                
            </div>
        );
    }
}

export default SalesReport;