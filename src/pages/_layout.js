import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import 'assets/scss/base.scss';
import './index.scss';

class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { location, match, children, layout } = this.props;
    return (
      <>
        {/* <ul>
          <li><Link to={`${match.url}index`}>index</Link></li>
          <li><Link to={`${match.url}index/9`}>index/tt</Link></li>
          <li><Link to={`${match.url}user`}>user</Link></li>
          <li><Link to={`${match.url}404`}>404</Link></li>
        </ul>
        <hr /> */}
        <div className="transitionWrapper">
          <TransitionGroup>
            <CSSTransition key={location.pathname} classNames={layout.action} timeout={300}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: state.layout
  }
}

export default withRouter(connect(mapStateToProps)(Layout));
