import { combineReducers } from "redux";

//Reducers
import achievementReducer from "./Achievements/achievementReducer";
import adminReducer from "./Admin/adminReducer";
import reviewReducer from "./Reviews/reviewReducer";

const rootReducer = combineReducers({
  achievement: achievementReducer,
  admin: adminReducer,
  review: reviewReducer,
});

export default rootReducer;
