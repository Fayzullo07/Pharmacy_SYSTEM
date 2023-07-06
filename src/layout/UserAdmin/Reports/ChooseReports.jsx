import React from "react";
import {
  debt_png,
  discount_png,
  expense,
  firm,
  firm_png,
  income,
  profile,
  qr,
  return1,
  workers
} from "../../../assets";
import {
  isFavoriteFunction,
  toggleFunction
} from "../../../redux/Actions/ToggleActions";

const ChooseReports = ({ setChoose, dispatch }) => {
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
              <h4>Tushum hisob-kitobi</h4>
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
              <h4>Chiqim hisob-kitobi</h4>
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
              <h4>Firmalarga chiqim hisob-kitobi</h4>
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
              <h4>QR-kod bilan qilingan savdo</h4>
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
              <h4>Chegirma bilan savdo</h4>
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
              <h4>Qaytarib olingan mahsulotlar</h4>
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
              <h4>Rahbar bilan hisob-kitobi</h4>
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
              <h4>Xodimlar bilan hisob kitobi</h4>
            </div>
          </div>
          <i className="fa fa-angle-right text-primary fs-5 mx-2" />
        </div>
      </div>
    </div>
  );
};

export default ChooseReports;
