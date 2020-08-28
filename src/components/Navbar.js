/**
 * @Date:   2020-01-27T11:06:50+00:00
 * @Last modified time: 2020-01-28T10:41:16+00:00
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../App.css";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;

    let form;

    if (this.props.auth.isAuthenticated) {
      form =

      <nav className="navbar">
          <li className="navbar-item">
          <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/name" className="nav-link">New Type</Link>
          </li>
     <li>
       {[''].map(
         variant => (
           <Button
               style={{
                 width: "100px",
                 borderRadius: "3px",
                 letterSpacing: "1px",
               }}
               onClick={this.onLogoutClick}
               variant="outline-danger"
             >
               Logout
             </Button>
         ),
       )}
     </li>
     </nav>

    } else {
      form = <p></p>;
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="icon"></div>
        <div className="collpase navbar-collapse">
        <Link to="/exercises" className="navbar-brand">TrackMaster</Link>
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          {form}
          </li>
        </ul>
      </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
