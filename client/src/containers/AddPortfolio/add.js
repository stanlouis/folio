import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPortfolio, clearNewPortfolio } from '../../actions';

class AddPortfolio extends Component {
  state = {
    formdata: {
      title: '',
      imgUrl: '',
      url: ''
    }
  };

  handleInput = (event, name) => {
    const newFormdata = {
      ...this.state.formdata
    };
    newFormdata[name] = event.target.value;

    this.setState({
      formdata: newFormdata
    });
  };

  showNewPortfolio = (portfolio) => (
    portfolio.post ?
        <div className="conf_link">
            Success !! <Link to={`/portfolios/${portfolio.portfolioId}`}>
                Click the link to see the portfolio.
            </Link>
        </div>
    :null
)

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(
      addPortfolio({
        ...this.state.formdata,
        ownerId: this.props.user.login.id
      })
    );
  };
  componentWillUnmount() {
    this.props.dispatch(clearNewPortfolio());
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Submit Portfolio</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter title"
              value={this.state.formdata.title}
              onChange={event => this.handleInput(event, 'title')}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter Portfolio Url"
              value={this.state.formdata.url}
              onChange={event => this.handleInput(event, 'url')}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter Portfolio Image Url"
              value={this.state.formdata.imgUrl}
              onChange={event => this.handleInput(event, 'imgUrl')}
            />
          </div>
          <button type="submit">Submit</button>
          {this.props.portfolios.newPortfolio
            ? this.showNewPortfolio(this.props.portfolios.newPortfolio)
            : null}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    portfolios: state.portfolios
  };
}

export default connect(mapStateToProps)(AddPortfolio);
