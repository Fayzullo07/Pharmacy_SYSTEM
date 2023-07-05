import React from "react";
import { expense, firm, income, profile, qr, return1, workers } from "../../../assets";
import { isFavoriteFunction, toggleFunction } from "../../../redux/Actions/ToggleActions";

const ChooseReports = ({ setChoose, dispatch }) => {

  return (
    <div className="container-fluid row p-0 m-0">
      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center ">
              <img src={income} width={50} alt="img" />
              <h4 className="px-2">Tushum hisob-kitobi</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("1");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("1");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={expense} width={50} alt="img" />
              <h4 className="px-2">Chiqim hisob-kitobi</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("2");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("2");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={firm} width={50} alt="img" />
              <h4 className="px-2">Firmalarga chiqim hisob-kitobi</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("3");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("3");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={qr} width={50} alt="img" />
              <h4 className="px-2">QR-kod bilan qilingan savdo</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("4");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("4");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={profile} width={50} alt="img" />
              <h4 className="px-2">Chegirma bilan savdo</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("5");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("5");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={return1} width={50} alt="img" />
              <h4 className="px-2">Qaytarib olingan mahsulotlar</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("6");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("6");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={profile} width={50} alt="img" />
              <h4 className="px-2">Rahbar bilan hisob-kitobi</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              onClick={() => {
                setChoose("7");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("7");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-10 offset-md-1 mb-2">
        <div className="border rounded d-flex align-items-center justify-content-between px-2 py-1">
          <div className="header_flex">
            <div className=" d-flex align-items-center">
              <img src={workers} width={50} alt="img" />
              <h4 className="px-2">Xodimlar bilan hisob kitobi</h4>
            </div>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn btn-outline-primary"
              v
              onClick={() => {
                setChoose("8");
                dispatch(isFavoriteFunction(true));
              }}
            >
              OYLIK
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setChoose("8");
                dispatch(isFavoriteFunction(false));
              }}
            >
              YILLIK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseReports;
