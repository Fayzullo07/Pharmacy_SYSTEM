import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { profile } from "../../assets";

import "./Topbar.css";
import {
  toggleDarkModeFunction,
  toggleFunction,
} from "../../redux/Actions/ToggleActions";
import { setDarkMode, setLightMode } from "../../functions/DarkModeFunction";
import ModalSimple from "../../utils/ModalSimple";

const Topbar = ({ children }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const savedUser = localStorage.getItem("user");

  const toggleData = useSelector((state) => state);
  const { toggle } = toggleData.toggle;
  const { toggleDarkMode } = toggleData.toggleDarkMode;

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <>
    {showModal && (

    <ModalSimple title="" showModal={showModal} setShowModal={setShowModal}>
      <div className="card mb-4">
              <div className="card-body text-center">
                <img src={profile} alt="avatar" width={120} className="rounded-circle img-fluid" />
                <h5 className="my-1">
                  {JSON.parse(savedUser)?.user.role == "Director" ? "Director" : "Worker"}
                  
                </h5>
                <h4 className="text-muted">
                  {JSON.parse(savedUser)?.user.first_name} {JSON.parse(savedUser)?.user.last_name}
                </h4>
                <h5 className="my-1">
                  {JSON.parse(savedUser)?.user.phone_number}
                </h5>
              </div>
            </div>
    </ModalSimple>
    )}
    <div className="topbar">
      <div
        className="toggle"
        onClick={() => {
          dispatch(toggleFunction(!toggle));
        }}
      >
        <i
          className="fa-solid fa-bars"
          style={
            toggle
              ? { color: "var(--text_color_blue)" }
              : { color: "var(--text_color_blue)" }
          }
        ></i>
      </div>
      {children}

      <div className="d-flex align-items-center gap-2">
        {/* <div>
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={toggleDarkMode}
            onChange={(e) => {
              toggleTheme(e);
              dispatch(toggleDarkModeFunction(!toggleDarkMode));
            }}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="ball"></span>
          </label>
        </div> */}
        {/* <!-- userImg --> */}
        {JSON.parse(savedUser)?.user.role == "Director" || JSON.parse(savedUser)?.user.role == "Manager" ? (
          <NavLink to={`/profile`}>
            <div className="user border border-primary">
              <img src={profile} alt="user" />
            </div>
          </NavLink>
        ) : <div className="user border border-primary" onClick={() => setShowModal(!showModal)}>
          <img src={profile} alt="user" />
        </div>}
      </div>
    </div>
    </>
  );
};

export default Topbar;
