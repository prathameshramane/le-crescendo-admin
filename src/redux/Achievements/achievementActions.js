import axios from "axios";
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

export const getAllAchievements = () => (dispatch) => {
  dispatch({ type: GET_ACHIEVEMENTS_REQUEST });
  axios
    .get("/achievements")
    .then((res) => {
      dispatch({ type: GET_ACHIEVEMENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => console.error(err.response.data));
};

export const addNewAchievement = (newAchievement) => (dispatch) => {
  dispatch({ type: ADD_NEW_ACHIEVEMENT_REQUEST });
  axios
    .post("/achievement", newAchievement)
    .then((res) => {
      dispatch({ type: ADD_NEW_ACHIEVEMENT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: ADD_NEW_ACHIEVEMENT_FAILURE,
        payload: err.response.data,
      });
    });
};

export const updateAchievement = (updatedAchievement, achievementId) => (
  dispatch
) => {
  dispatch({ type: UPDATE_ACHIEVEMENT_REQUEST });
  axios
    .put(`/achievement/${achievementId}`, updatedAchievement)
    .then((res) => {
      dispatch({ type: UPDATE_ACHIEVEMENT_SUCCESS, payload: res.data });
    })
    .catch((err) => console.error(err.response.data));
};

export const deleteAchievement = (achievementId) => (dispatch) => {
  dispatch({ type: DELETE_ACHIEVEMENT_REQUEST });
  axios
    .delete(`/achievement/${achievementId}`)
    .then((res) => {
      dispatch({ type: DELETE_ACHIEVEMENT_SUCCESS, payload: res.data });
    })
    .catch((err) => console.error(err.response.data));
};

export const isUpdateAchievementSuccessToFalse = () => (dispatch) => {
  dispatch({ type: IS_IPDATE_ACHIEVEMENT_SUCCESS_TO_FALSE });
};

export const isAddAchievementSuccessToFalse = () => (dispatch) => {
  dispatch({ type: IS_ADD_ACHIEVEMENT_SUCCESS_TO_FALSE });
};

export const uploadAchievementImage = (formData, achievementId) => (
  dispatch
) => {
  dispatch({ type: UPLOADING_ACHIEVEMENT_IMAGE_REQUEST });
  axios
    .post(`/achievement/${achievementId}/uploadImg`, formData)
    .then((res) => {
      dispatch({
        type: UPLOADING_ACHIEVEMENT_IMAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
