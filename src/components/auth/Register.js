/**
 * @Date:   2019-10-24T13:53:54+01:00
 * @Last modified time: 2019-11-11T13:22:41+00:00
 */



import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Card, Row, Col } from 'react-bootstrap';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
componentWillReceiveProps(nextProps) {
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
  // Stops the page reloading when the submit button is pressed
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history);
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <Card className="register-card">
        <Row style={{ marginTop: "1rem" }}>
          <Col>
            <Col style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Sign Up</b>
              </h4>
              <p className="grey-text text-darken-1" style={{marginBottom: "0"}}>
                Already have an account? <Link to="/login">Login</Link>
            </p><br/>
            </Col>
            <form noValidate onSubmit={this.onSubmit}>
              <Col className="input-field">
                <label className="register-label" htmlFor="name">Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <span className="red-text">{errors.name}</span>
              </Col>
              <Col className="input-field">
                <label className="register-label" htmlFor="email">Email</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span className="red-text">{errors.email}</span>
              </Col>
              <Col className="input-field">
                <label className="register-label" htmlFor="password">Create Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span className="red-text">{errors.password}</span>
              </Col>
              <Col className="input-field">
                <label className="register-label" htmlFor="password">Confirm Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <span className="red-text">{errors.password2}</span>
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
                  Sign up
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
