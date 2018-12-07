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
      <header>
        <div className="header-bd">
          <a href="javascript:void(0);" onClick={() => { this.go('/home/search'); }}>
            <i className="iconfont icon-fanhui"></i> 请输入关键字进行搜索
              </a>
        </div>
      </header>
    );
  }
}

export default Index;