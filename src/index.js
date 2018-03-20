import React, { Component } from "react";
import ReactDom, { render } from "react-dom";
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import "./less/reset.less";
import './less/index.less';
import './font/iconfont.css';
import Home from './pages/Home/Home.js';
import Result from './pages/Result/Result.js';
import CustomList from './pages/CustomList/CustomList.js';
import { getDisSupplier, wechatWeb } from '../src/js/api.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.changeCurrent = this.changeCurrent.bind(this);
    this.state = {
      currentLocation: {},
      nearShopList:''
    }
  }
  
  componentWillMount() {
    // wechatWeb().then((res) => {
    //     // console.log(res.data);
    //     var _this = this;
    //     var jsonData = JSON.parse(res.data);
    //     wx.config({
    //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: jsonData.appId, // 必填，公众号的唯一标识
    //         timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
    //         signature: jsonData.signature,// 必填，签名
    //         jsApiList: ['getLocation', 'scanQRCode'] // 必填，需要使用的JS接口列表
    //     });

    //     wx.ready(function() {
    //         wx.getLocation({
    //             type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //             success: function (res) {
    //                 var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //                 var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //                 console.log(res)
    //                 _this.setState(() => {
    //                     return {
    //                         lat: latitude,
    //                         lon: longitude,
    //                     }
    //                 }, () => {
    //                     getDisSupplier(
    //                         _this.state.lat,
    //                         _this.state.lon,
    //                         _this.state.page,
    //                         _this.state.nodeName,
    //                         _this.state.type,
    //                         _this.state.areaId
    //                     ).then((res) => {
    //                         _this.setState({diSuppliers: res.data[0].data,loading: false})
    //                         _this.loadMore();
    //                     })
    //                 })
    //             }
    //         });
    //     })
    // })

    getDisSupplier("39.95933", "116.29845", 1).then(res => {
        this.setState({
            nearShopList: res.data[0].data,
            currentLocation: res.data[0].data[0]
        })
    })
  }

  changeCurrent(currentShop) {
    // console.log(currentShop)
    this.setState({
      currentLocation: currentShop
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={() => (<Home currentLocation= {this.state.currentLocation}/>)}/> 
          <Route path='/customList' component={(route) => (<CustomList nearShopList={this.state.nearShopList} route={route} changeCurrent={this.changeCurrent}/>)}/>
        </Switch>
      </Router>
    )
  }
}


ReactDom.render(
  <App/>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept(() => {
    ReactDom.render(
      <App/>,
      document.getElementById("root")
    );
  });
}
