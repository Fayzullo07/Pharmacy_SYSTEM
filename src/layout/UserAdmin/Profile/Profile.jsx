import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { branches, expense_png, firm_png, firms, income, income_png, profile, team } from "../../../assets";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../ui/TextInput";
import { useMutation } from "react-query";
import { profilePatchAction } from "../../../functions/DirectorActions";
import PasswordInput from "../../../ui/PasswordInput";
import { toast } from "react-toastify";
import { cleanedData } from "../../../functions/NecessaryFunctions";
import { getGlobalDeteilsAction } from "../../../redux/Actions/GlobalAction";
import { useTranslation } from "react-i18next";

import "./Profile.css";

const Profile = ({ userData }) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const savedUser = localStorage.getItem("user");
  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });


  const [formData, setFormData] = useState({
    first_name: director.first_name,
    last_name: director.last_name
  });

  const [formDataPassword, setFormDataPassword] = useState({
    password: "",
    r_password: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "first_name" && value.length > 50) {
      return;
    }

    if (name == "last_name" && value.length > 50) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangePassword = e => {
    const { name, value } = e.target;

    setFormDataPassword({ ...formDataPassword, [name]: value });
  };
  const [chamgePass, setChangePass] = useState(false);
  const { t } = useTranslation("translation", { keyPrefix: "Profile" });
  const mutation = useMutation(
    async () => {
      return profilePatchAction(cleanedData(formData));
    },
    {
      onSuccess: () => {
        dispatch(getGlobalDeteilsAction());
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.first_name) {
      toast.warning(`${t(8)} !`);
      return;
    }

    if (!formData.first_name) {
      toast.warning(`${t(9)} !`);
      return;
    }

    if (chamgePass) {
      if (!formDataPassword.password) {
        toast.warning(`${t(10)} !`);
        return;
      }
      if (formDataPassword.password != formDataPassword.r_password) {
        toast.warning(`${11} !`);
        return;
      }
      setFormDataPassword({ ...formDataPassword, password: formDataPassword.password });
    }

    mutation.mutate();
  };

  const navigate = useNavigate();
  return <div className="d-flex">
    <Navbar />
    <div className={`container_g ${toggle ? "" : "active"}`}>
      <Topbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src={profile} alt="avatar" width={120} className="rounded-circle img-fluid" />
                {/* <h5 className="my-1">
                  {userData.role == "Director" ? "Director" : userData.role == "Manager" ? "Menejer" : "Worker"}
                </h5> */}
                <h4 className="text-muted">
                  {director.first_name} {director.last_name}
                </h4>
                <h5 className="my-1">
                  {JSON.parse(savedUser)?.user.phone_number}
                </h5>
              </div>
            </div>
            <div className="card p-2 mb-3">
              <div className="row">
                <div className="col-md-6 col">
                  <TextInput name={"first_name"} value={formData.first_name} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isRequired={true} placeholder={"Ismingiz"} />
                </div>
                <div className="col-md-6 col">
                  <TextInput name={"last_name"} value={formData.last_name} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isRequired={true} placeholder={"Familiyangiz"} />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {/* CHECKBOX USER */}
                  <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded p-1 py-3 mb-3">
                    <b>{t(7)}</b>
                    <input className="form-check-input mx-1" type="checkbox" checked={chamgePass} onClick={() => setChangePass(!chamgePass)} />
                  </div>
                </div>
                {chamgePass && (
                  <>
                    <div className="col-12">
                      <PasswordInput name={"password"} value={formDataPassword.password} handleInputChange={handleInputChangePassword} handleSubmit={handleSubmit} isRequired={true} placeholder={"Parol"} />
                    </div>
                    <div className="col-12">
                      <PasswordInput name={"r_password"} value={formDataPassword.r_password} handleInputChange={handleInputChangePassword} handleSubmit={handleSubmit} isRequired={true} placeholder={"Parol qayta"} />
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-3">
                <div className="col text-end">
                  <button className="btn btn-primary" onClick={handleSubmit}>{t(6)}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row  mb-4">
              <div className="col-md-12">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    {JSON.parse(savedUser)?.user.role == "Director" && (
                      <>
                        <div className="d-flex align-items-center justify-content-between cursor_pointer" onClick={() => navigate("/managers")}>
                          <div className="d-flex align-items-center">
                            <img id="profile_img" src={profile} alt="img" />
                            <h4 className="mb-0">{t(0)}</h4>
                          </div>

                          <i className="fa fa-angle-right fs-4" />
                        </div>
                        <hr />
                      </>
                    )}

                    <div className="d-flex align-items-center justify-content-between cursor_pointer" onClick={() => navigate("/branches/profile")}>
                      <div className="d-flex align-items-center">
                        <img id="profile_img" src={branches} alt="branches" />
                        <h4 className="mb-0">{t(2)}</h4>
                      </div>

                      <i className="fa fa-angle-right fs-4" />
                    </div>
                    <hr />

                    <div className="d-flex align-items-center justify-content-between cursor_pointer" onClick={() => navigate("/workers")}>
                      <div className="d-flex align-items-center">
                        <img id="profile_img" src={team} alt="img" />
                        <h4 className="mb-0">{t(3)}</h4>
                      </div>

                      <i className="fa fa-angle-right fs-4" />
                    </div>
                    <hr />

                    <div className="d-flex align-items-center justify-content-between cursor_pointer" onClick={() => navigate("/firms/profile")}>
                      <div className="d-flex align-items-center">
                        <img id="profile_img" src={firm_png} alt="" />
                        <h4 className="mb-0">{t(1)}</h4>
                      </div>

                      <i className="fa fa-angle-right fs-4" />
                    </div>
                    <hr />

                    <div className="d-flex align-items-center justify-content-between cursor_pointer" onClick={() => navigate("/expenses")}>
                      <div className="d-flex align-items-center">
                        <img id="profile_img" src={income_png} alt="img" />
                        <h4>{t(4)}</h4>
                      </div>

                      <i className="fa fa-angle-right fs-4" />
                    </div>
                    <hr />

                    <div className="d-flex align-items-center justify-content-between cursor_pointer" onClick={() => navigate("/incomes")}>
                      <div className="d-flex align-items-center">
                        <img id="profile_img" src={expense_png} alt="expense" />
                        <h4>{t(5)}</h4>
                      </div>

                      <i className="fa fa-angle-right fs-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Profile;
