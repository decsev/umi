import React, { PureComponent } from 'react';
import router from 'umi/router';
import './index.scss';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  go(url) {
    const reg = /^(http:\/\/|https:\/\/).*$/g;
    if (url === '') {
      return;
    }
    if (reg.test(url)) {
      window.location.href = url;
      return false;
    }
    router.push(url);
  }
  render() {
    const { imgUrl, price, title } = this.props;
    return (
      <div className="nav-container">
        <div className="nav-item-wp">
          <div className="nav-item current">
            <i className="iconfont icon-fenlei"></i>
            <p>首页</p>
          </div>
          <div className="nav-item">
            <i className="iconfont icon-fenlei"></i>
            <p>购物车</p>
          </div>
          <div className="nav-item">
            <i className="iconfont icon-fenlei"></i>
            <p>我要升级</p>
          </div>
          <div className="nav-item">
            <i className="iconfont icon-fenlei"></i>
            <p>订单</p>
          </div>
          <div className="nav-item">
            <i className="iconfont icon-fenlei"></i>
            <p>我的</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;