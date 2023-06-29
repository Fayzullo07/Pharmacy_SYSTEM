import { GET_GLOBAL_DETEILS } from "../Constants/GlobalConstant";

// GET GLOBAL DETEILS
export const getGlobalDeteilsReducers = (state = { deteils: [] }, action) => {
  switch (action.type) {
    case GET_GLOBAL_DETEILS:
      return { deteils: action.payload };

    default:
      return state;
  }
};
