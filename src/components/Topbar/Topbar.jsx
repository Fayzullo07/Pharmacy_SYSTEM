import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { profile } from "../../assets";

import "./Topbar.css";
import {
  toggleDarkModeFunction,
  toggleFunction,
} from "../../redux/Actions/ToggleActions";
import { setDarkMode, setLightMode } from "../../functions/DarkModeFunction";
import { useMutation, useQuery } from "react-query";
import { profilePatchAction } from "../../functions/DirectorActions";
import Modal from "../../utils/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import TextInput from "../../ui/TextInput";
import Textarea from "../../ui/Textarea";
import { cleanedData } from "../../functions/NecessaryFunctions";
import { profileGetAPI } from "../../api/DirectorRequest";

const Topbar = ({ children }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const savedUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    address: "",
    bio: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "first_name" && value.length > 50) {
      return;
    }

    if (name == "last_name" && value.length > 50) {
      return;
    }

    if (name == "father_name" && value.length > 50) {
      return;
    }

    if (name == "address" && value.length > 50) {
      return;
    }

    setFormData({ ...formData, [name]: e.target.value });
  };

  const toggleData = useSelector((state) => state);
  const { toggle } = toggleData.toggle;
  const { toggleDarkMode } = toggleData.toggleDarkMode;

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  const { data, isLoading, error } = useQuery("profile_w", async () => {
    return await profileGetAPI();
  });

  const mutation = useMutation(
    async () => {
      return profilePatchAction(cleanedData({
        ...formData,
        last_name: `${formData.last_name} ${formData.father_name}`
      }));
    },
    {
      onSuccess: () => {
        setShowModal(false)
      }
    }
  );

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.data.first_name,
        last_name: data.data.last_name.split(" ")[0],
        father_name: data.data.last_name.split(" ")[1],
        address: data.data.address,
        bio: data.data.bio
      })
    }
  }, [data])

  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });

  const handleSubmit = () => {
    if (!formData.first_name) {
      toast.warning(m(22));
      return;
    }

    if (!formData.last_name) {
      toast.warning(m(23));
      return;
    }

    if (!formData.father_name) {
      toast.warning(m(30));
      return;
    }
    mutation.mutate();
  };
  return (
    <>
      {showModal && (

        <Modal showModal={showModal} setShowModal={setShowModal} mutation={mutation} handleSubmit={handleSubmit} title="O'zgartirish" >
          <div className="row mb-4">
            <div className=" text-center">
              <img src={profile} alt="avatar" width={80} className="rounded-circle img-fluid mt-2" />
              <h5 className="my-1">
                {JSON.parse(savedUser)?.user.role == "Director" ? "Director" : "Worker"}

              </h5>
             
              <h5 className="mt-1 mb-0">
                {JSON.parse(savedUser)?.user.phone_number}
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextInput
                name={"first_name"}
                value={formData.first_name}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isRequired={true}
                placeholder={"Ismingiz"}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                name={"last_name"}
                value={formData.last_name}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isRequired={true}
                placeholder={"Familiyangiz"}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                name={"father_name"}
                value={formData.father_name}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isRequired={true}
                placeholder={"Otasini ismi"}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                name={"address"}
                value={formData.address}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                placeholder={"Manzil"}
              />
            </div>
            <div className="col-md-12 mb-2">
              {/* BIO */}
              <Textarea
                name={"bio"}
                value={formData.bio}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </Modal>
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
