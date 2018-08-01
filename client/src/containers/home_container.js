import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortfolios } from '../actions';

import PortfolioItem from '../widgetsUI/portfolio_item';

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getPortfolios(2, 0, 'desc'));
  }

  renderItems = portfolios =>
    portfolios.list
      ? portfolios.list.map(item => <PortfolioItem {...item} key={item._id} />)
      : null;

  load_more = () => {
    let count = this.props.portfolios.list.length;
    this.props.dispatch(
      getPortfolios(1, count, 'desc', this.props.portfolios.list)
    );
  };

  render() {
    return (
      <div>
        {this.renderItems(this.props.portfolios)}
        <div className="load_more" onClick={this.load_more}>
          Load More
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    portfolios: state.portfolios
  };
}
export default connect(mapStateToProps)(HomeContainer);
