import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Swiper } from 'components';
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
      containerClassName: "w-100 h-300",
      direction: 'horizontal', // vertical, horizontal
      loop: false, // false, true
      needPagination: true, // false, true
      swiperSlides: [
        { img: 'https://m-static.ppmoney.com/Public/Img/d3ef12fa-23f1-452f-baad-2648db97f0df.jpg', url: 'http://www.baidu.com' },
        { img: 'https://m-static.ppmoney.com/Public/Img/d3ef12fa-23f1-452f-baad-2648db97f0df.jpg', url: '/404' }
      ],
    }
    return (
      <>
        <Swiper {...swiperProps}></Swiper>
        <div className="wp">
          <div className="container">
            文案
          <p className="mb-20">p标签内容</p>
            哈哈
        </div>
          <div className="exc">
            exc文案
          <p>p标签内容</p>
          </div>
          <div className="hairlines">888</div>
          <div className="b-1px">666</div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(Index);
