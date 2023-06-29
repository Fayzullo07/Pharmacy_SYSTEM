import {
  IS_FAVORITE_FALSE_TRUE,
  TOGGLE_DARK_MODE_FALSE_TRUE,
  TOGGLE_FALSE_TRUE,
} from "../Constants/ToggleConstants";

//  toogle
export const toggleFunction = (toggle) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_FALSE_TRUE, payload: toggle });
  } catch (error) {
    console.log(error);
  }
};

export const toggleDarkModeFunction = (toggle) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_DARK_MODE_FALSE_TRUE, payload: toggle });
  } catch (error) {
    console.log(error);
  }
};

export const isFavoriteFunction = (toggle) => async (dispatch) => {
  try {
    dispatch({ type: IS_FAVORITE_FALSE_TRUE, payload: toggle });
  } catch (error) {
    console.log(error);
  }
};
