import {
  GET_ACHIEVEMENTS_REQUEST,
  GET_ACHIEVEMENTS_SUCCESS,
  ADD_NEW_ACHIEVEMENT_REQUEST,
  ADD_NEW_ACHIEVEMENT_SUCCESS,
  ADD_NEW_ACHIEVEMENT_FAILURE,
  DELETE_ACHIEVEMENT_REQUEST,
  DELETE_ACHIEVEMENT_SUCCESS,
  UPDATE_ACHIEVEMENT_REQUEST,
  UPDATE_ACHIEVEMENT_SUCCESS,
  IS_ADD_ACHIEVEMENT_SUCCESS_TO_FALSE,
  IS_IPDATE_ACHIEVEMENT_SUCCESS_TO_FALSE,
  UPLOADING_ACHIEVEMENT_IMAGE_REQUEST,
  UPLOADING_ACHIEVEMENT_IMAGE_SUCCESS,
} from "./achievementActionTypes";

const initialState = {
  loading: false,
  deleting: false,
  updating: false,
  uploadingImg: false,
  posting: false,
  isUpdateSuccess: false,
  isAddSuccess: false,
  achievements: [],
  error: {},
};

const achievementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACHIEVEMENTS_REQUEST:
      return { ...state, loading: true };

    case GET_ACHIEVEMENTS_SUCCESS:
      return { ...state, loading: false, achievements: action.payload };

    case ADD_NEW_ACHIEVEMENT_REQUEST:
      return { ...state, posting: true };

    case ADD_NEW_ACHIEVEMENT_SUCCESS:
      return {
        ...state,
        posting: false,
        achievements: [action.payload, ...state.achievements],
        isAddSuccess: true,
      };

    case ADD_NEW_ACHIEVEMENT_FAILURE:
      return { ...state, posting: false, error: action.payload };

    case UPDATE_ACHIEVEMENT_REQUEST:
      return { ...state, updating: true };

    case UPDATE_ACHIEVEMENT_SUCCESS:
      const updatedAchievementIndex = state.achievements.findIndex(
        (achievement) =>
          achievement.achievementId === action.payload.achievementId
      );

      state.achievements[updatedAchievementIndex] = action.payload;
      return { ...state, updating: false, isUpdateSuccess: true };

    case DELETE_ACHIEVEMENT_REQUEST:
      return { ...state, deleting: true };

    case DELETE_ACHIEVEMENT_SUCCESS:
      const deletedAchievemenIndex = state.achievements.findIndex(
        (achievement) =>
          achievement.achievementId === action.payload.achievementId
      );
      state.achievements.splice(deletedAchievemenIndex, 1);
      return { ...state, deleting: false };

    case IS_IPDATE_ACHIEVEMENT_SUCCESS_TO_FALSE:
      return { ...state, isUpdateSuccess: false };

    case IS_ADD_ACHIEVEMENT_SUCCESS_TO_FALSE:
      return { ...state, isAddSuccess: false };

    case UPLOADING_ACHIEVEMENT_IMAGE_REQUEST:
      return { ...state, uploadingImg: true };

    case UPLOADING_ACHIEVEMENT_IMAGE_SUCCESS:
      const updatedImgIndex = state.achievements.findIndex(
        (achievement) => achievement.achievementId === action.payload.achievementId
      );
      state.achievements[updatedImgIndex] = action.payload;
      return { ...state, uploadingImg: false };

    default:
      return { ...state };
  }
};

export default achievementReducer;
