import React, { PureComponent } from 'react';
import { connect } from 'dva';
import './index.scss';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log('APP_TYPE', APP_TYPE);
    // console.log(this.props)
  }
  render() {
    return (
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
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(Index);
