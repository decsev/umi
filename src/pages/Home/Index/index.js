import React from 'react';
import { connect } from 'dva';
import { Swiper, Product, HeaderSearch, Navigation } from 'components';
import './index.scss';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log('APP_TYPE', APP_TYPE);
    // console.log(this.props)
  }
  render() {
    const swiperProps = {
      containerClassName: "w-100 h-420 home-banner",
      swiperPro: {
        direction: 'horizontal', // vertical, horizontal
        loop: false, // false, true
        autoplay: true,
      },
      needPagination: true, // false, true
      swiperSlides: [
        { img: require('assets/img/banner.png'), url: 'http://www.baidu.com' },
        { img: require('assets/img/banner.png'), url: 'http://www.baidu.com' },
      ],
    }
    const productProps = {
      imgUrl: require('assets/img/product.png'),
      title: '产品标题',
      price: '￥1500'
    }
    return (
      <div className="page-container">
        <div className="page-innerContainer">
          <HeaderSearch></HeaderSearch>
          <div className="main-container">
            <Swiper {...swiperProps}></Swiper>
            <div className="cat-nav-container">
              <div className="cat-item">
                <i className="iconfont icon-fenlei"></i>
                <p>面部</p>
              </div>
              <div className="cat-item">
                <i className="iconfont icon-fenlei"></i>
                <p>身体</p>
              </div>
              <div className="cat-item">
                <i className="iconfont icon-fenlei"></i>
                <p>爆款</p>
              </div>
              <div className="cat-item">
                <i className="iconfont icon-fenlei"></i>
                <p>洗护</p>
              </div>
              <div className="cat-item">
                <i className="iconfont icon-fenlei"></i>
                <p>其它</p>
              </div>
            </div>

            <div className="padding-container">
              <div className="notice mt-15 mb-15">
                <i className="iconfont icon-fenlei" />&nbsp;本月优惠政策：&lt; 氧佰草肌护焕颜面膜 &gt; 买二送一
              </div>
            </div>

            <div className="padding-container">
              <img className="ad-img" src={require('assets/img/ad-img.png')}></img>
            </div>

            <div className="cat-title-container mt-15 mb-15">
              <div className="cat-title">面膜系列：热卖推荐</div>
              <div className="more">更多好货 &gt;</div>
            </div>

            <div className="padding-container">
              <div className="text-ad mt-15 mb-15">
                面部主推爆款
              </div>
            </div>

            <div className="padding-container">
              <div className="product-container">
                <Product {...productProps}></Product>
                <Product {...productProps}></Product>
              </div>
            </div>

            <div className="cat-title-container mt-15 mb-15">
              <div className="cat-title">身体系列：热卖推荐</div>
              <div className="more">更多好货 &gt;</div>
            </div>

            <div className="padding-container">
              <div className="text-ad mt-15 mb-15">
                身体主推爆款
              </div>
            </div>

            <div className="padding-container">
              <div className="product-container">
                <Product {...productProps}></Product>
                <Product {...productProps}></Product>
              </div>
            </div>

            <div className="cat-title-container mt-15 mb-15">
              <div className="cat-title">洗护系列：热卖推荐</div>
              <div className="more">更多好货 &gt;</div>
            </div>

            <div className="padding-container">
              <div className="text-ad mt-15 mb-15">
                洗护主推爆款
              </div>
            </div>

            <div className="padding-container">
              <div className="product-container">
                <Product {...productProps}></Product>
                <Product {...productProps}></Product>
              </div>
            </div>

            <div className="footerholder"></div>
          </div>
          <Navigation></Navigation>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(Index);
