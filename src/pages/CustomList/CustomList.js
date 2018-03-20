import React, { Component } from 'react';
import { Route, Switch, NavLink,Redirect, history } from 'react-router-dom';
import { getDisSupplier } from '../../js/api.js';
import './customList.less';

function SearchBox(props) {
    return (
        <div className='search-warpper'>
            <div className='search-content'> 
                <i className='iconfont icon-search'></i>
                <form onSubmit={props.handleSubmit}>
                <input placeholder='请输入商家名称' className='input-box' value={props.value} onChange={props.handleChange} /> 
                </form>
            </div>
        </div>
    )
}

function Nav() {
    return (
        <div className='nav-wrapper'>
            <div className='nav-item'><NavLink  activeClassName="selected" to='/customList/near'>附近商家</NavLink></div>
            <div className='nav-item'><NavLink  activeClassName="selected" to='/customList/recently'>最近选择</NavLink></div>
        </div>
    )
}

function NearShopList(props) {
    // console.log(props.shopList)
    if(!props.shopList.length) {
        return (<div className='no-data'>没有数据...</div>)
    }
    // 筛选出小于5km的店铺
    if(!props.keyword) {
        var shopList = props.shopList.filter(item => {
            return item.distance < 5;
        });
    } else {
        var shopList = props.shopList;
    }
    const listItems = shopList.map((shop,index) => {
        return (
            <div className='shop-item' key={index} onClick={props.nearShopClick.bind(this, shop)}>
                <div className='top'>
                    <div className='shop-name'>{shop.node_name}</div>
                    {shop.distance > 0.1 ? (<div className='distance'>{shop.distance}km</div>) :(<div className='distance'>&lt;0.1km</div>)}
                </div>
                <div className='address'>{shop.addr}</div>
            </div>
        )
    })
    return (<div className='near-wrapper'>{listItems}</div>)
}

function RecentlySelect(props) {
    if(!props.shopList) {
        return <div className='no-data'>没有数据...</div>
    }
    const shopList = props.shopList;
    const listItems = shopList.map((shop, index) => (
        <div className='shop-item' key={index} onClick={props.recentlyShopClick.bind(this, shop)}>
            <div className='top'>
                <div className='shop-name'>{shop.node_name}</div>
                {shop.distance > 0.1 ? (<div className='distance'>{shop.distance}km</div>) :(<div className='distance'>&lt;0.1km</div>)}
            </div>
            <div className='address'>{shop.addr}</div>
        </div>
    ))
    return (<div className='recently-wrapper'>{listItems}</div>)
}

class CustomList extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.nearShopClick = this.nearShopClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.recentlyShopClick = this.recentlyShopClick.bind(this);
        this.state = {
            keyword: '',
            nearShopList: this.props.nearShopList,
            recentlyShopList: localStorage.getItem('recentlySelect') ? JSON.parse(localStorage.getItem('recentlySelect')): '',
            currentSelect: ''
        }
    }

    componentDidUpdate() {
        if(!this.state.currentSelect) {
            return
        }
        this.props.changeCurrent(this.state.currentSelect);
        let history = this.props.route.history;
        history.push({pathname: '/'})

    }

    handleChange(event) {
        this.setState({
            keyword: event.target.value
        })
    }

    handleSubmit() {
        getDisSupplier("39.95933", "116.29845", 1, this.state.keyword).then(res => {
            this.setState({
                nearShopList: res.data[0].data
            })
        })
    }

    nearShopClick(shop) {
        this.setState({
            currentSelect: shop
        })
        
        if(!localStorage.getItem('recentlySelect')) {
            let arr = [];
            arr.push(shop);
            localStorage.setItem('recentlySelect', JSON.stringify(arr))
            this.setState({
                recentlyShopList: arr,
            })
        } else {
            let shopList = JSON.parse(localStorage.getItem('recentlySelect'));
            let flag = shopList.findIndex((value, index) => {
                return value.node_id === shop.node_id
            })
            if(flag !== -1) {
                return
            }
            if(shopList.length > 9) {
                shopList.pop()
                shopList.unshift(shop)
            } else {
                shopList.unshift(shop)
            }
            localStorage.setItem('recentlySelect', JSON.stringify(shopList));
            this.setState({
                recentlyShopList: shopList,
            })
            // console.log(shopList)
        }
    }

    recentlyShopClick(shop) {
        this.setState({
            currentSelect: shop
        })
    }

    render() {
        return (
            <div className='custom-wrapper'>
                <div className='head-wrapper'>
                    <SearchBox value={this.state.keyword} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                    <Nav/>
                </div>
                <Switch>
                    <Route path='/customList/near' component={() => (<NearShopList keyword={this.state.keyword} shopList={this.state.nearShopList} nearShopClick={this.nearShopClick}/>)} />
                    <Route path='/customList/recently' component={() => (<RecentlySelect shopList={this.state.recentlyShopList} recentlyShopClick={this.recentlyShopClick}/>)}/>
                    <Redirect from='/customList' to='/customList/near'/>
                </Switch>
            </div>
        )
    }
}

export default CustomList;