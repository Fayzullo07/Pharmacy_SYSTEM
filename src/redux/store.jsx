import { configureStore } from "@reduxjs/toolkit";
import { getGlobalDeteilsReducers } from "./Reducers/GlobalReducer";
import {
  isFavoriteReducer,
  toggleDarkModeReducer,
  toggleReducer,
} from "./Reducers/ToggeRudecer";

export const store = configureStore({
  reducer: {
    deteils: getGlobalDeteilsReducers,
    toggle: toggleReducer,
    toggleDarkMode: toggleDarkModeReducer,
    is_favorite: isFavoriteReducer,
  },
});
