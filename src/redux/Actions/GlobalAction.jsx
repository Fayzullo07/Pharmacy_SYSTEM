import { toast } from "react-toastify";
import * as GlobalApi from "../../api/GlobalRequest";
import { GET_GLOBAL_DETEILS } from "../Constants/GlobalConstant";

export const getGlobalDeteilsAction = () => async dispatch => {
  try {
    const { data } = await GlobalApi.companiesDetailsGetApi();
    dispatch({ type: GET_GLOBAL_DETEILS, payload: data });
  } catch (error) {
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      if (error.response.status == 401) {
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );

      return;
    }
  }
};
