import * as GlobalApi from "../../api/GlobalRequest";
import { GET_GLOBAL_DETEILS } from "../Constants/GlobalConstant";
import { useToasts } from "react-toast-notifications";

export const getGlobalDeteilsAction = () => async (dispatch) => {
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
      const { addToast } = useToasts();
      addToast(
        `${error.response.status} ${key} ${error.response.data[key][0]}`,
        {
          appearance: "warning",
          autoDismiss: true,
        }
      );
      return;
    }
  }
};
