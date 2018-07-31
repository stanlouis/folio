import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends PureComponent {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
  };

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleInputPassword = event => {
    this.setState({ password: event.target.value });
  };
  handleInputName = event => {
    this.setState({ firstname: event.target.value });
  };
  handleInputLastname = event => {
    this.setState({ lastname: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.register === false) {
      this.setState({ error: 'Error,try again' });
    } else {
      this.setState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      });
    }
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({ error: '' });

    this.props.dispatch(
      userRegister(
        {
          email: this.state.email,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        },
        this.props.user.users
      )
    );
  };

  render() {
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Registration Information</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter first name"
              value={this.state.firstname}
              onChange={this.handleInputName}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter Lastname"
              value={this.state.lastname}
              onChange={this.handleInputLastname}
            />
          </div>

          <div className="form_element">
            <input
              type="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>

          <div className="form_element">
            {/* Todo: validate password */}
            <input
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>

          <button type="submit">Register</button>
          <div className="error">{this.state.error}</div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Register);
