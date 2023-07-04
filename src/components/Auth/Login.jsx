import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import { checkPhoneNumber } from "../../functions/NecessaryFunctions";

import validator from "validator";
import { loginAction } from "../../functions/AuthFunctions";

import { profile } from "../../assets";

import "./Login.css";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [phone_number, setPhoneNumber] = useState("+998");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    const {value} = e.target;
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
  }
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const mutation = useMutation(() => {
    return loginAction(phone_number, password, navigate, onLogin);
  });
  const handleSubmit = () => {
    if (checkPhoneNumber(phone_number)) {
      toast.warning("Telefon raqamni to'gri kiriting !")
      return;
    }

    if (!validator.isLength(password, { max: 15 })) {
      toast.warning("Parol min 8 !!!!")
  
      return;
    }
    mutation.mutate();
  };
  return (
    <div>
      <>
        <div className="back_login">
          <div className="container_log">
           
            <div className="login-content">
              <div className="form">
                <img src={profile} />
                <h2 className="title">Tizimga kirish</h2>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="tel"
                      className="input"
                      placeholder="+998 90 000 00 00"
                      value={phone_number}
                      onChange={handleUserNameChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div
                    className="i cursor_pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={` fa-regular fa-eye${
                        showPassword ? "-slash" : ""
                      }`}
                    />
                  </div>
                  <div className="div">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      className="input"
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                </div>
                <button
                  className="btn_log"
                  onClick={handleSubmit}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? (
                    <i className="fa fa-spinner fa-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Login;
