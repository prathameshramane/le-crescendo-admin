import axios from "axios";
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  ADD_NEW_REVIEW_REQUEST,
  ADD_NEW_REVIEW_SUCCESS,
  ADD_NEW_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  IS_ADD_REVIEW_SUCCESS_TO_FALSE,
  IS_IPDATE_REVIEW_SUCCESS_TO_FALSE,
  UPLOADING_REVIEW_IMAGE_REQUEST,
  UPLOADING_REVIEW_IMAGE_SUCCESS,
} from "./reviewActionTypes";

export const getAllReviews = () => (dispatch) => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  axios
    .get("/reviews")
    .then((res) => {
      dispatch({ type: GET_REVIEWS_SUCCESS, payload: res.data });
    })
    .catch((err) => console.error(err.response.data));
};

export const addNewReview = (newReview) => (dispatch) => {
  dispatch({ type: ADD_NEW_REVIEW_REQUEST });
  axios
    .post("/review", newReview)
    .then((res) => {
      dispatch({ type: ADD_NEW_REVIEW_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: ADD_NEW_REVIEW_FAILURE, payload: err.response.data });
    });
};

export const updateReview = (updatedReview, reviewId) => (dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });
  axios
    .put(`/review/${reviewId}`, updatedReview)
    .then((res) => {
      dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: res.data });
    })
    .catch((err) => console.error(err.response.data));
};

export const deleteReview = (reviewId) => (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  axios
    .delete(`/review/${reviewId}`)
    .then((res) => {
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: res.data });
    })
    .catch((err) => console.error(err.response.data));
};

export const isUpdateReviewSuccessToFalse = () => (dispatch) => {
  dispatch({ type: IS_IPDATE_REVIEW_SUCCESS_TO_FALSE });
};

export const isAddReviewSuccessToFalse = () => (dispatch) => {
  dispatch({ type: IS_ADD_REVIEW_SUCCESS_TO_FALSE });
};

export const uploadReviewImage = (formData, reviewId) => (dispatch) => {
  dispatch({ type: UPLOADING_REVIEW_IMAGE_REQUEST });
  axios
    .post(`/review/${reviewId}/uploadImg`, formData)
    .then((res) => {
      dispatch({ type: UPLOADING_REVIEW_IMAGE_SUCCESS, payload: res.data });
    })
    .catch((err) => console.log(err));
};
