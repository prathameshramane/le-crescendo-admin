import React, { Component, Fragment } from "react";

//React Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

//Redux
import { connect } from "react-redux";
import {
  updateAchievement,
  isUpdateAchievementSuccessToFalse,
  deleteAchievement,
  uploadAchievementImage,
} from "../redux";

class AchievementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showEdit: false,
      studentName: this.props.achievement.studentName,
      body: this.props.achievement.body,
      designation: this.props.achievement.designation,
      featured: this.props.achievement.featured ? "Yes" : "No",
    };
  }

  handleDeleteClose = () => {
    this.setState({ showDelete: false });
  };

  handleDeleteShow = () => {
    this.setState({ showDelete: true });
  };

  handleEditClose = () => {
    this.setState({ showEdit: false });
  };

  handleEditShow = () => {
    this.setState({ showEdit: true });
  };

  handleDelete = () => {
    this.props.deleteAchievement(this.props.achievement.achievementId);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const updatedAchievement = {
      studentName: this.state.studentName,
      body: this.state.body,
      designation: this.state.designation,
      featured: this.state.featured === "Yes" ? true : false,
    };
    this.props.updateAchievement(
      updatedAchievement,
      this.props.achievement.achievementId
    );
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadAchievementImage(
      formData,
      this.props.achievement.achievementId
    );
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageAchievementInput");
    fileInput.click();
  };

  render() {
    const { count, achievement } = this.props;
    if (this.props.isUpdateSuccess) {
      this.handleEditClose();
      this.props.isUpdateAchievementSuccessToFalse();
    }
    return (
      <Fragment>
        <tr key={achievement.achievementId}>
          <td>{count}</td>
          <td style={{ position: "relative" }}>
            <img
              src={achievement.imageUrl}
              alt="Achievement"
              style={{ height: "150px", width: "150px", objectFit: "contain" }}
            />
            {this.props.uploadingImg && (
              <Spinner
                style={{ position: "absolute", top: "70px", left: "70px" }}
                animation="border"
              />
            )}
            <input
              type="file"
              id="imageAchievementInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <Button
              variant="primary"
              onClick={this.handleEditPicture}
              style={{ top: "125px", left: "123px", position: "absolute" }}
            >
              <i className="fa fa-pencil"></i>
            </Button>
          </td>
          <td>{achievement.studentName}</td>
          <td>{achievement.body}</td>
          <td>{achievement.designation}</td>
          <td>{achievement.featured ? "Yes" : "No"}</td>
          <td>
            <Button variant="outline-danger" onClick={this.handleDeleteShow}>
              <i className="fa fa-trash-o"></i>
            </Button>
          </td>
          <td>
            <Button variant="outline-primary" onClick={this.handleEditShow}>
              <i className="fa fa-pencil"></i>
            </Button>
          </td>
        </tr>
        <Modal show={this.state.showDelete} onHide={this.handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Achievement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to Delete? (Action is not reversible)
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={this.handleDelete}
              disabled={this.props.deleting}
              style={{ position: "relative" }}
            >
              Delete
              {this.props.deleting && (
                <Spinner
                  style={{ position: "absolute", margin: "0 -36px" }}
                  animation="border"
                />
              )}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Achievement</Modal.Title>
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
                />
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
                  name="body"
                  onChange={this.handleChange}
                />
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
              style={{ position: "relative" }}
              disabled={this.props.updating}
            >
              Update
              {this.props.updating && (
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
  deleting: state.achievement.deleting,
  updating: state.achievement.updating,
  isUpdateSuccess: state.achievement.isUpdateSuccess,
  uploadingImg: state.achievement.uploadingImg,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAchievement: (achievementId) =>
    dispatch(deleteAchievement(achievementId)),
  updateAchievement: (updatedAchievement, achievementId) =>
    dispatch(updateAchievement(updatedAchievement, achievementId)),
  isUpdateAchievementSuccessToFalse: () =>
    dispatch(isUpdateAchievementSuccessToFalse()),
  uploadAchievementImage: (formData, achievementId) =>
    dispatch(uploadAchievementImage(formData, achievementId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementComponent);
