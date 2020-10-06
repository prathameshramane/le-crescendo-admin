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

const initialState = {
  loading: false,
  posting: false,
  deleting: false,
  updating: false,
  isUpdateSuccess: false,
  isAddSuccess: false,
  uploadingImg: false,
  reviews: [],
  error: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { ...state, loading: true };

    case GET_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };

    case ADD_NEW_REVIEW_REQUEST:
      return { ...state, posting: true };

    case ADD_NEW_REVIEW_SUCCESS:
      return {
        ...state,
        posting: false,
        reviews: [action.payload, ...state.reviews],
        error: {},
        isAddSuccess: true,
      };

    case ADD_NEW_REVIEW_FAILURE:
      return { ...state, posting: false, error: action.payload };

    case UPDATE_REVIEW_REQUEST:
      return { ...state, updating: true };

    case UPDATE_REVIEW_SUCCESS:
      const updatedReviewIndex = state.reviews.findIndex(
        (review) => review.reviewId === action.payload.reviewId
      );

      state.reviews[updatedReviewIndex] = action.payload;
      return { ...state, updating: false, isUpdateSuccess: true };

    case DELETE_REVIEW_REQUEST:
      return { ...state, deleting: true };

    case DELETE_REVIEW_SUCCESS:
      const deletedReviewIndex = state.reviews.findIndex(
        (review) => review.reviewId === action.payload.reviewId
      );
      state.reviews.splice(deletedReviewIndex, 1);
      return { ...state, deleting: false };

    case IS_IPDATE_REVIEW_SUCCESS_TO_FALSE:
      return { ...state, isUpdateSuccess: false };

    case IS_ADD_REVIEW_SUCCESS_TO_FALSE:
      return { ...state, isAddSuccess: false };

    case UPLOADING_REVIEW_IMAGE_REQUEST:
      return { ...state, uploadingImg: true };

    case UPLOADING_REVIEW_IMAGE_SUCCESS:
      const updatedImgIndex = state.reviews.findIndex(
        (review) => review.reviewId === action.payload.reviewId
      );
      state.reviews[updatedImgIndex] = action.payload;
      return { ...state, uploadingImg: false };

    default:
      return { ...state };
  }
};

export default reviewReducer;
