import React from "react";
import {
  debt_png,
  discount_png,
  expense,
  firm_png,
  profile,
  qr,
  return1,
  workers
} from "../../../assets";
import { useTranslation } from "react-i18next";

const ChooseReports = ({ setChoose }) => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

  return (
    <div className="container-fluid row px-0 mx-0 mt-3">
      <div className="col-12 col-md-10 offset-md-1 mb-2 ">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("1");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={debt_png} width={50} alt="img" />
              <h4>
                {g(67)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("2");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={expense} width={50} alt="img" />
              <h4>
                {g(68)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("3");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={firm_png} width={50} alt="img" />
              <h4>
                {g(69)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("4");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={qr} width={50} alt="img" />
              <h4>
                {g(70)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("5");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={discount_png} width={50} alt="img" />
              <h4>
                {g(47)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("6");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={return1} width={50} alt="img" />
              <h4>
                {g(71)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("7");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={profile} width={50} alt="img" />
              <h4>
                {g(72)}
              </h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div
          className="reports d-flex align-items-center justify-content-between px-2 py-1"
          onClick={() => {
            setChoose("8");
          }}
        >
          <div className="header_flex">
            <div>
              <img src={workers} width={50} alt="img" />
              <h4>{g(73)}</h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>
    </div>
  );
};

export default ChooseReports;
