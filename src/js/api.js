import axios from "axios";
// const basePath = 'http://b197362h08.imwork.net/trace/';
const basePath = 'http://www.bjfxr.com/analyse/';


// 定位当前位置接口，返回附近的市场
export let getDisSupplier = function(lat, lon,page = 1, node_name) {
  let url = basePath + "tracingchain/nodeDistance"
  let data = { x_coordinate: lat, y_coordinate: lon, node_name: node_name, page: page};
  
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: data })
      .then(res => {
        resolve(res);
      })
      .catch(res => {
        reject("error");
      });
  });
};

// 微信配置接口
var urld = window.location.href.split('#')[0];
var encodeUrl = encodeURIComponent(urld);
export let wechatWeb = function(param) {
  let url = basePath + "wx.do?method=getWxConf&url=" + urld;
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
        resolve(res.data);
      }).catch(res => {
        reject("error");
      });
  });
};


