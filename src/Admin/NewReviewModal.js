import React, { Component, Fragment } from "react";

//React Bootstarp
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

//Redux
import { connect } from "react-redux";
import { addNewReview, isAddReviewSuccessToFalse } from "../redux";

const styles = {
  submitBtn: {
    position: "relative",
  },
  spinner: {
    position: "absolute",
    margin: "0 -36px",
  },
};

class NewReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      studentName: "",
      body: "",
      ratings: 1,
      featured: false ? "Yes" : "No",
    };
  }

  handleEditClose = () => {
    this.setState({ showEdit: false });
    this.clearState();
  };

  handleEditShow = () => {
    this.setState({ showEdit: true });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  clearState = () => {
    this.setState({
      studentName: "",
      body: "",
      ratings: 1,
      featured: false ? "Yes" : "No",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      studentName: this.state.studentName,
      body: this.state.body,
      ratings: this.state.ratings,
      featured: this.state.featured === "Yes" ? true : false,
    };
    this.props.addNewReview(newReview);
  };

  render() {
    if (this.props.isAddSuccess) {
      this.handleEditClose();
      this.props.isAddReviewSuccessToFalse();
    }
    return (
      <Fragment>
        <Button
          variant="success"
          style={{ maxWidth: "250px", alignSelf: "center" }}
          onClick={this.handleEditShow}
        >
          Add New Review
        </Button>
        <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
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
                  isInvalid={this.props.error.studentName ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.error.studentName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  defaultValue={this.state.body}
                  name="body"
                  onChange={this.handleChange}
                  placeholder="Write Review Here"
                  isInvalid={this.props.error.body ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.error.body}
                </Form.Control.Feedback>
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
              onClick={this.handleSubmit}
              style={styles.submitBtn}
              disabled={this.props.posting}
            >
              Submit
              {this.props.posting && (
                <Spinner style={styles.spinner} animation="border" />
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posting: state.review.posting,
  error: state.review.error,
  isAddSuccess: state.review.isAddSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  addNewReview: (newReview) => dispatch(addNewReview(newReview)),
  isAddReviewSuccessToFalse: () => dispatch(isAddReviewSuccessToFalse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewReviewModal);
