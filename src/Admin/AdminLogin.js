import React, { Component } from "react";
import PropTypes from "prop-types";

//React Bootstrap Stuff
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

//Redux
import { connect } from "react-redux";
import { adminLogin } from "../redux";

const styles = {
  loginBtn: {
    position: "relative",
  },
  spinner: {
    position: "absolute",
    margin: "0 -36px",
  },
};

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const adminCredentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.adminLogin(adminCredentials);
  };

  render() {
    return (
      <Container className="d-flex justify-content-center">
        <Form style={{ minWidth: "350px" }} className="card p-5">
          <Form.Group>
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              name="email"
              placeholder="Enter Admin Email"
              onChange={this.handleChange}
              isInvalid={this.props.error.email ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {this.props.error.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              name="password"
              placeholder="Enter Admin Password"
              onChange={this.handleChange}
              isInvalid={this.props.error.password ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {this.props.error.password}
            </Form.Control.Feedback>
          </Form.Group>

          {this.props.error.message && (
            <span style={{ color: "red" }}>{this.props.error.message}</span>
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.props.loading}
            style={styles.loginBtn}
          >
            Login
            {this.props.loading && (
              <Spinner style={styles.spinner} animation="border" />
            )}
          </Button>
        </Form>
      </Container>
    );
  }
}

AdminLogin.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  adminLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.admin.loading,
  authenticated: state.admin.authenticated,
  error: state.admin.error,
});

const mapDispatchToProps = (dispatch) => ({
  adminLogin: (adminCredentials) => dispatch(adminLogin(adminCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
