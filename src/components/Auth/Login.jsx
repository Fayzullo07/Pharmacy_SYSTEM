import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import { checkPhoneNumber } from "../../functions/NecessaryFunctions";

import validator from "validator";
import { loginAction } from "../../functions/AuthFunctions";

import { logo1 } from "../../assets";

import "./Login.css";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [phone_number, setPhoneNumber] = useState("+998");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const handleUserNameChange = e => {
    const { value } = e.target;
    if (value.length > 13) {
      return;
    } else {
      e.target.value = value.slice(0, 13);
      if (typeof value === "string") {
        // Raqam matn (string) turida kiritilgan
        e.target.value = value.replace(/[^0-9+]|(?<=^[\s\S]*?\+)[+]+/g, "");
      }
    }

    setPhoneNumber(e.target.value);
  };
  const handlePasswordChange = event => setPassword(event.target.value);

  const mutation = useMutation(() => {
    return loginAction(phone_number, password, navigate, onLogin);
  });

   const Director = useMutation(({phone, pass}) => {
    return loginAction(phone, pass, navigate, onLogin);
  });
   const Worker = useMutation(({phone, pass}) => {
    return loginAction(phone, pass, navigate, onLogin);
  });
  const handleSubmit = e => {
    e.preventDefault();
    if (checkPhoneNumber(phone_number)) {
      toast.warning("Telefon raqamni to'gri kiriting !");
      return;
    }

    if (!validator.isLength(password, { max: 15 })) {
      toast.warning("Parol min 8 !!!!");

      return;
    }
    mutation.mutate();
  };
  return (
    <>
      <div id="body_image" className="text-end">
        <div className="btn-group btn-group-sm p-2">
          <button type="button" className="btn btn-primary" disabled>Demo</button>
          <button type="button" className="btn btn-outline-primary" onClick={() => {
            Director.mutate({phone:"+998331234567 ", pass: "JSVOsadlocby554647" })
          }}
            disabled={Director.isLoading}
          >
            {Director.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : "Director"}</button>
          <button type="button" className="btn btn-outline-primary" onClick={() => {
            Worker.mutate({phone:"+998337654321 ", pass: "qpnsadJHGJ292459" })
          }}
            disabled={Worker.isLoading}
          >
            {Worker.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : "Xodim"}</button>
        </div>
      </div>
      <div className="box">

        <img src={logo1} alt="logo" />
        <h2>Tizimga kirish</h2>
        <form className="mb-2">
          <div className="inputBox">
            <input
              type="tel"
              placeholder="Telefon raqam kiriting"
              value={phone_number}
              onChange={handleUserNameChange}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              required
            />
            <label>Telefon raqam kiriting</label>
          </div>
          <div className="inputBox">

            <i className={`fa fa-eye${showPassword ? '' : "-slash"}`} onClick={() => setShowPassword(!showPassword)}></i>
            <input
              type={`${showPassword ? "password" : "text"}`}
              placeholder="Parol"
              onChange={handlePasswordChange}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              required
            />
            <label>Parol kiriting</label>
          </div>
          <button
            className="input"
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : "Kirish"}
          </button>
        </form>
        <a href="https://t.me/e_hisobot_offical" target="_blank">E-Hisobot haqida ko'proq ma'lumot</a>
      </div>
    </>
  );
};

export default Login;
