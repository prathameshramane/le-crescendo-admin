import React, { Component, Fragment } from "react";

//React Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

//Redux
import { connect } from "react-redux";
import { addNewAchievement, isAddAchievementSuccessToFalse } from "../redux";

class NewAchievementModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      studentName: "",
      body: "",
      designation: "",
      featured: false ? "Yes" : "No",
    };
  }

  handleEditClose = () => {
    this.setState({ showEdit: false });
  };

  handleEditShow = () => {
    this.setState({ showEdit: true });
  };

  clearState = () => {
    this.setState({
      studentName: "",
      body: "",
      designation: "",
      featured: false ? "Yes" : "No",
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newAchievement = {
      studentName: this.state.studentName,
      body: this.state.body,
      designation: this.state.designation,
      featured: this.state.featured === "Yes" ? true : false,
    };
    this.props.addNewAchievement(newAchievement);
  };

  render() {
    if (this.props.isAddSuccess) {
      this.handleEditClose();
      this.props.isAddAchievementSuccessToFalse();
    }
    return (
      <Fragment>
        <Button
          variant="success"
          style={{ maxWidth: "250px", alignSelf: "center" }}
          onClick={this.handleEditShow}
        >
          Add New Achievement
        </Button>
        <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Achievement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Student Name"
                  defaultValue={this.state.studentName}
                  name="studentName"
                  onChange={this.handleChange}
                  isInvalid={this.props.error.studentName}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.error.studentName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Designation"
                  defaultValue={this.state.designation}
                  name="designation"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  defaultValue={this.state.body}
                  placeholder="Write Achievement Here"
                  name="body"
                  onChange={this.handleChange}
                  isInvalid={this.props.error.body}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.error.body}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Featured</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={this.state.featured}
                  name="featured"
                  onChange={this.handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleEditClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleSubmit}
              disabled={this.props.posting}
              style={{ position: "relative" }}
            >
              Submit
              {this.props.posting && (
                <Spinner
                  style={{ position: "absolute", margin: "0 -36px" }}
                  animation="border"
                />
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posting: state.achievement.posting,
  error: state.achievement.error,
  isAddSuccess: state.achievement.isAddSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  addNewAchievement: (newAchievement) =>
    dispatch(addNewAchievement(newAchievement)),
  isAddAchievementSuccessToFalse: () =>
    dispatch(isAddAchievementSuccessToFalse()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAchievementModal);
