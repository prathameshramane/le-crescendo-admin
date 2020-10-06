import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

//Components
import ReviewComponent from "./ReviewComponent";
import AchievementComponent from "./AchievementComponent";
import NewReviewModal from "./NewReviewModal";
import NewAchievementModal from "./NewAchievementModal";

//React Bootstrap Stuff
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

//Redux
import { connect } from "react-redux";
import { getAllReviews, getAllAchievements, adminLogout } from "../redux";
import { Button } from "react-bootstrap";

class AdminMain extends Component {
  componentDidMount = () => {
    this.props.getAllReviews();
    this.props.getAllAchievements();
  };

  handleLogout = () => {
    this.props.adminLogout();
  };

  render() {
    let count = 0;
    const reviewsMarkup = this.props.review.reviews.map((review) => (
      <ReviewComponent key={review.reviewId} count={++count} review={review} />
    ));
    count = 0;
    const achievementsMarkup = this.props.achievement.achievements.map(
      (achievement) => (
        <AchievementComponent
          key={achievement.achievementId}
          count={++count}
          achievement={achievement}
        />
      )
    );

    return (
      <Fragment>
        <Button
          variant="warning"
          style={{ marginLeft: "45%" }}
          onClick={this.handleLogout}
        >
          Logout
        </Button>
        <Row>
          <Col className="d-flex flex-column justify-content-center ml-2">
            <h3>
              Reviews Section
              {this.props.review.loading && (
                <Spinner style={{ margin: "0 15px" }} animation="border" />
              )}
            </h3>
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Student Name</th>
                  <th>Review</th>
                  <th>Ratings</th>
                  <th>Featured</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>{reviewsMarkup}</tbody>
            </Table>
            <NewReviewModal />
          </Col>

          <Col className="d-flex flex-column justify-content-center mr-2">
            <h3>
              Achievements Section
              {this.props.achievement.loading && (
                <Spinner style={{ margin: "0 15px" }} animation="border" />
              )}
            </h3>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Student Name</th>
                  <th>Achievement</th>
                  <th>Designation</th>
                  <th>Featured</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>{achievementsMarkup}</tbody>
            </Table>
            <NewAchievementModal />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

AdminMain.propTypes = {
  review: PropTypes.object.isRequired,
  achievement: PropTypes.object.isRequired,
  getAllReviews: PropTypes.func.isRequired,
  getAllAchievements: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
  achievement: state.achievement,
});

const mapDispatchToProps = (dispatch) => ({
  getAllReviews: () => dispatch(getAllReviews()),
  getAllAchievements: () => dispatch(getAllAchievements()),
  adminLogout: () => dispatch(adminLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
