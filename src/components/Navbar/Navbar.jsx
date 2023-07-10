import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { routes, routesEmployee } from "../../api";
import { toggleFunction } from "../../redux/Actions/ToggleActions";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import Languages from "./Languages";
import { logo, logout } from "../../assets";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [navData, setNavData] = useState([]);
  const [logOutModal, setLogOutModal] = useState(false);
  const dispatch = useDispatch();

  const toggleData = useSelector((state) => state.toggle);
  const { toggle } = toggleData;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      if (JSON.parse(savedUser).user.role == "Director" || JSON.parse(savedUser).user.role == "Manager") {
        setNavData(routes);
      } else if (JSON.parse(savedUser).user.role == "Worker") {
        setNavData(routesEmployee);
      }
    }
  }, []);


  const { t } = useTranslation("translation", { keyPrefix: "Navbar" });

  return (
    <>
      {logOutModal && (
        <Logout showModal={logOutModal} setShowModal={setLogOutModal} />
      )}
      <div className={`navigation ${toggle ? "" : "active"}`}>
        <ul>
          <NavLink href="/profile">
            <li>
              <img src={logo} alt="logo" />
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
                  if (item.slug == '/reports') {
                    dispatch(toggleFunction(false));
                  } else {
                    dispatch(toggleFunction(true));
                  }
                }}
              >
                <span className="icon">
                  <img src={item.img} className={`${item.img}`}/>
                </span>
                <span className="title">{t(item.name)}</span>
              </li>
            </NavLink>
          ))}
          <a onClick={() => setLogOutModal(true)} className="cursor_pointer">
            <li>
              <span className="icon">
                <img src={logout} alt="logout" />
              </span>
              <span className="title">{t(7)}</span>
            </li>
          </a>
          <Languages />
        </ul>
      </div>
    </>
  );
};

export default Navbar;
