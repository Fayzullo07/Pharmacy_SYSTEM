import * as AuthApi from "../api/AuthRequest";

import { useToasts } from "react-toast-notifications";
// LOGIN TOKEN
export const loginAction = async (
  phone_number,
  password,
  navigate,
  onLogin
) => {
  try {
    const { data } = await AuthApi.loginAPI(phone_number, password);

    if (data.user.role) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();

      if (data.user.role == "Project Owner") {
        onLogin(data.user);
        navigate("/", { replace: true });
      } else if (data.user.role == "Director") {
        onLogin(data.user);
        navigate("/", { replace: true });
      } else if (data.user.role == "Worker") {
        onLogin(data.user);
        navigate("/", { replace: true });
      }
    }
  } catch (error) {
    const { addToast } = useToasts();
    if (error.response.status == 401) {
      addToast("Tizimda mavjud emassiz!!!", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
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
