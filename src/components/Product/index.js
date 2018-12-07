import React, { PureComponent } from 'react';
import router from 'umi/router';
import './index.scss';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { imgUrl, price, title } = this.props;
    return (
      <div className="pro-item">
        <img className="pro-img" src={imgUrl} />
        <div className="pro-title">{title}</div>
        <div className="pro-bottom">
          <div className="price">{price}</div>
          <div className="pro-car">
            <img src={require('assets/img/car.png')} />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;