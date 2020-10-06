import React, { Component, Fragment } from "react";

//React Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

//Redux
import { connect } from "react-redux";
import {
  deleteReview,
  updateReview,
  isUpdateReviewSuccessToFalse,
  uploadReviewImage,
} from "../redux";

class ReviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showEdit: false,
      studentName: this.props.review.studentName,
      body: this.props.review.body,
      ratings: this.props.review.ratings,
      featured: this.props.review.featured ? "Yes" : "No",
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDelete = () => {
    this.props.deleteReview(this.props.review.reviewId);
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const updatedReview = {
      studentName: this.state.studentName,
      body: this.state.body,
      ratings: this.state.ratings,
      featured: this.state.featured === "Yes" ? true : false,
    };
    this.props.updateReview(updatedReview, this.props.review.reviewId);
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadReviewImage(formData, this.props.review.reviewId);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageReviewInput");
    fileInput.click();
  };

  render() {
    const { count, review } = this.props;
    if (this.props.isUpdateSuccess) {
      this.handleEditClose();
      this.props.isUpdateReviewSuccessToFalse();
    }
    return (
      <Fragment>
        <tr key={review.reviewId}>
          <td>{count}</td>
          <td style={{ position: "relative" }}>
            <img
              src={review.imageUrl}
              alt="Achievement"
              style={{ height: "150px", width: "150px", objectFit: "contain" }}
            ></img>

            {this.props.uploadingImg && (
              <Spinner
                style={{ position: "absolute", top: "70px", left: "70px" }}
                animation="border"
              />
            )}
            <input
              type="file"
              id="imageReviewInput"
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
          <td>{review.studentName}</td>
          <td>{review.body}</td>
          <td>{review.ratings}</td>
          <td>{review.featured ? "Yes" : "No"}</td>
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
            <Modal.Title>Delete Review</Modal.Title>
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
            <Modal.Title>Update Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  name="studentName"
                  placeholder="Student Name"
                  defaultValue={this.state.studentName}
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
                <Form.Label>Ratings</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={this.state.ratings}
                  name="ratings"
                  onChange={this.handleChange}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
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
              onClick={this.handleUpdate}
              disabled={this.props.updating}
              style={{ position: "relative" }}
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
  deleting: state.review.deleting,
  updating: state.review.updating,
  isUpdateSuccess: state.review.isUpdateSuccess,
  uploadingImg: state.review.uploadingImg,
});

const mapDispatchToProps = (dispatch) => ({
  deleteReview: (reviewId) => dispatch(deleteReview(reviewId)),
  updateReview: (updatedReview, reviewId) =>
    dispatch(updateReview(updatedReview, reviewId)),
  isUpdateReviewSuccessToFalse: () => dispatch(isUpdateReviewSuccessToFalse()),
  uploadReviewImage: (formData, reviewId) =>
    dispatch(uploadReviewImage(formData, reviewId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewComponent);
