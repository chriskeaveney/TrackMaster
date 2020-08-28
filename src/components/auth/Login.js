/**
 * @Date:   2019-10-24T13:54:46+01:00
 * @Last modified time: 2019-11-11T13:23:10+00:00
 */


import { Card, Row, Col } from 'react-bootstrap';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "../../App.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/exercises");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/exercises"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <Card className="login-card">
        <Row style={{ marginTop: "3rem" }}>
          <Col>
            <Col style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b>
              </h4>
              <p className="grey-text text-darken-1" style={{marginBottom: "0"}}>
                Don't have an account? <Link to="/register">Register</Link>
            </p><br/>
            </Col>
            <form noValidate onSubmit={this.onSubmit}>
              <Col className="input-field">
                <label className="login-label" htmlFor="email">Email</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </Col>
              <Col className="input-field">
                <label className="login-label" htmlFor="password">Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </Col>
              <Col style={{ width: '100%'}}>
                <Link to="/" className="btn-flat waves-effect" style={{paddingTop: "10px"}}>
                  <p class="back">Back to home</p>
                </Link>
                <button
                  style={{
                    width: "80px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    textAlign: "center",
                    padding: "0",
                    backgroundColor: "#e4e4e4",
                    fontSize: "14px",
                    border: "solid 1px #7f8fa6"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </Col>
            </form>
          </Col>
        </Row>
        </Card>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
