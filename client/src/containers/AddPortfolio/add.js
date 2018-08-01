import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { addPortfolio } from '../../actions'

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

  submitForm = (e) => {
      e.preventDefault();
      this.props.dispatch(addPortfolio({
          ...this.state.formdata,
          ownerId:this.props.user.login.id
      }))
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
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    portfolios: state.portfolios
  };
}

export default connect(mapStateToProps)(AddPortfolio);
