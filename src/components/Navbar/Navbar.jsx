import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { routes, routesEmployee } from "../../api";
import { toggleFunction } from "../../redux/Actions/ToggleActions";
import { useDispatch, useSelector } from "react-redux";
import { changeLang, handleLogout } from "../../App";
import Logout from "./Logout";
import Languages from "./Languages";

const Navbar = () => {
  const [navData, setNavData] = useState([]);
  const [logOutModal, setLogOutModal] = useState(false);
  const dispatch = useDispatch();

  const toggleData = useSelector((state) => state.toggle);
  const { toggle } = toggleData;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      if (JSON.parse(savedUser).user.role == "Director") {
        setNavData(routes);
      } else if (JSON.parse(savedUser).user.role == "Worker") {
        setNavData(routesEmployee);
      }
    }
  }, []);

  return (
    <>
      {logOutModal && (
        <Logout showModal={logOutModal} setShowModal={setLogOutModal} />
      )}
      <div className={`navigation ${toggle ? "" : "active"}`}>
        <ul>
          <NavLink href="/profile">
            <li>
              <span className="title">E</span>
              <span className="title">Hisobot.com</span>
            </li>
          </NavLink>
          {navData.map((item) => (
            <NavLink
              key={item.slug}
              to={item.slug}
              className={({ isActive }) => (isActive ? "hovered" : "")}
            >
              <li
                key={item.name}
                onClick={() => {
                  dispatch(toggleFunction(true));
                }}
              >
                <span className="icon">
                  <i className={`${item.img}`}></i>
                </span>
                <span className="title">{item.name}</span>
              </li>
            </NavLink>
          ))}
          <NavLink to={"/"} onClick={() => setLogOutModal(true)}>
            <li>
              <span className="icon">
                <i className="fas fa-right-from-bracket fa-lg"></i>
              </span>
              <span className="title">Log out</span>
            </li>
          </NavLink>
          <Languages/>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
