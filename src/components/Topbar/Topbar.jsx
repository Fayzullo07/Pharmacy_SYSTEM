import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { profile } from "../../assets";

import "./Topbar.css";
import {
  toggleDarkModeFunction,
  toggleFunction,
} from "../../redux/Actions/ToggleActions";
import { setDarkMode, setLightMode } from "../../functions/DarkModeFunction";

const Topbar = ({ children }) => {
  const dispatch = useDispatch();

  const savedUser = localStorage.getItem("user");

  const toggleData = useSelector((state) => state);
  const { toggle } = toggleData.toggle;
  const { toggleDarkMode } = toggleData.toggleDarkMode;

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
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
        <div>
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
        </div>
        {/* <!-- userImg --> */}
        {JSON.parse(savedUser)?.user.role == "Director" && (
          <NavLink to={`/profile`}>
            <div className="user">
              <img src={profile} alt="user" />
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Topbar;
