import React, { Component } from "react";
import {Link, Route} from "react-router-dom";
import PropTypes from "prop-types";
import "./home.less";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    currentLocation: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="currentLocation">
          <Link to='/customList'>
            <span >{this.props.currentLocation.node_name}</span>
            <i className="icon iconfont icon-jiantouxia" />
          </Link> 
        </div>
        <div className="code">
          <img src={require("../../images/logo.png")} className="logo" />
        </div>
        <div className="scan-wrapper">
          <p className="titles">扫一扫商品条形码/二维码,查看商品追溯信息</p>
          <p className="saoyisao">扫一扫</p>
          <div className="code-wrapper">
            <img src={require("../../images/scan.png")} className="scan-img" />
          </div>
        </div>
      </div>
    );
  }
}


export default Home;
