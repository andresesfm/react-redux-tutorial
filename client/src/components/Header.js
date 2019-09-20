import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./HeaderStyle.css";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Signout</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signin">Signin</Link>
          <Link to="/signup">Signup</Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <Link to="/">Redux Auth!</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStatetoProps)(Header);
