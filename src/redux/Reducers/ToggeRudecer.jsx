import {
  IS_FAVORITE_FALSE_TRUE,
  TOGGLE_DARK_MODE_FALSE_TRUE,
  TOGGLE_FALSE_TRUE,
} from "../Constants/ToggleConstants";

// TOGGLE
export const toggleReducer = (state = { toggle: true }, action) => {
  switch (action.type) {
    case TOGGLE_FALSE_TRUE:
      return { toggle: action.payload };
    default:
      return state;
  }
};

// DARK MODE TOGGLE
export const toggleDarkModeReducer = (
  state = { toggleDarkMode: false },
  action
) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE_FALSE_TRUE:
      return { toggleDarkMode: action.payload };
    default:
      return state;
  }
};

export const isFavoriteReducer = (state = { is_favorite: true }, action) => {
  switch (action.type) {
    case IS_FAVORITE_FALSE_TRUE:
      return { is_favorite: action.payload };
    default:
      return state;
  }
};
