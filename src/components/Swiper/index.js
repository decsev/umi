import React, { PureComponent } from 'react';
import router from 'umi/router';
import './index.scss';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props)
    const { direction, loop } = this.props;
    const myswiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      direction,
      loop
    });
  }
  go(url) {
    console.log(123, url)
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
    const { swiperSlides } = this.props;
    console.log('thistrewterwprops', this.props);
    const swiperSlidesHtml = swiperSlides.map((item, index) => {
      return (<div key={index} className="swiper-slide">
        {item.img && <img src={item.img} className="swiper-img" onClick={() => { this.go(item.url); }} />}
      </div>)
    })
    return (
      // < !--Slider main container-- >
      <div className={this.props.containerClassName}>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {/* <div className="swiper-slide">Slide 1</div>
            <div className="swiper-slide">Slide 2</div>
            <div className="swiper-slide">Slide 3</div>
            <div className="swiper-slide">Slide 4</div>
            <div className="swiper-slide">Slide 5</div>
            <div className="swiper-slide">Slide 6</div>
            <div className="swiper-slide">Slide 7</div>
            <div className="swiper-slide">Slide 8</div> */}
            {swiperSlidesHtml}
          </div>
          {!!this.props.needPagination && <div className="swiper-pagination"></div>}
        </div>
      </div>
    );
  }
}

export default Index;