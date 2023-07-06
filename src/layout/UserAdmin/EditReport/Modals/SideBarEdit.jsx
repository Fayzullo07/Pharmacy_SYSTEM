import React, { useState } from "react";
import "./SideBarEdit.css";

const SideBarEdit = ({ shows, setShows }) => {
  const [showUl, setShowUl] = useState(false);
  return (
    <div id="btn_hover_parent" className="btn-toolbar w-100">
      <div className="btn-group btn-group-sm mx-2 w-100">
        <button
          type="button"
          className={`btn btn-${shows == "1" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("1")}
        >
          <i className="fa fa-arrow-down fs-5" />
        </button>
        <button
          type="button"
          className={`btn btn-${shows == "2" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("2")}
        >
          <i className="fa fa-arrow-up fs-5" />
        </button>
        <button
          id="btn_hover"
          type="button"
          className={`btn btn-${shows == "3" ? "primary" : "outline-primary"}`}
          onClick={() => {
            setShows("3");
          }}
        >
          <i className="fa fa-building fs-5" />
        </button>

        <button
          id="btn_hover"
          className={`px-2 btn btn-${shows == "4" ||
          shows == "5" ||
          shows == "6" ||
          shows == "7" ||
          shows == "8" ||
          shows == "9"
            ? "primary"
            : "outline-primary"} btn-sm`}
          type="button"
          onMouseEnter={() => {
            setShowUl(true);
          }}
          onMouseLeave={() => {
            setShowUl(false);
          }}
        >
          <i className="fa fa-money-bill-transfer fs-5" />
        </button>
        

        <button
          type="button"
          className={`btn btn-${shows == "10" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("10")}
        >
          <i className="fa fa-rotate-left fs-5" />
        </button>
        <button
          type="button"
          className={`btn btn-${shows == "11" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("11")}
        >
          <i className="fa fa-cart-shopping  fs-5" />
        </button>
        <button
          type="button"
          className={`btn btn-${shows == "12" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("12")}
        >
          <i className="fa fa-users fs-5" />
        </button>
      </div>

      <ul
        id="child"
        class="child"
        onMouseEnter={() => {
          setShowUl(true);
        }}
        onMouseLeave={() => {
          setShowUl(false);
        }}
        style={
          showUl
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <li className={`${shows == "4" && "active"}`}>
          <button
            className={`${shows == "4" && "active"} dropdown-item`}
            onClick={() => {
              setShows("4");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("4");
            }}
          >
            Qarzga qilingan savdo
          </button>
        </li>
        <li className={`${shows == "5" && "active"}`}>
          <button
            type="button"
            className={`${shows == "5" && "active"} dropdown-item`}
            onClick={() => {
              setShows("5");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("5");
            }}
          >
            Qarzga qilingan savdoni qaytarish
          </button>
        </li>
        <li className={`${shows == "6" && "active"}`}>
          <button
            type="button"
            className={`${shows == "6" && "active"} dropdown-item`}
            onClick={() => {
              setShows("6");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("6");
            }}
          >
            Qarz berish
          </button>
        </li>

        <li className={`${shows == "7" && "active"}`}>
          <button
            type="button"
            className={`${shows == "7" && "active"} dropdown-item`}
            onClick={() => {
              setShows("7");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("7");
            }}
          >
            Berilgan qarzni qaytarish
          </button>
        </li>

        <li className={`${shows == "8" && "active"}`}>
          <button
            type="button"
            className={`${shows == "8" && "active"} dropdown-item`}
            onClick={() => {
              setShows("8");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("8");
            }}
          >
            Qarz olish
          </button>
        </li>

        <li className={`${shows == "9" && "active"}`}>
          <button
            type="button"
            className={`${shows == "9" && "active"} dropdown-item`}
            onClick={() => {
              setShows("9");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("9");
            }}
          >
            Olingan qarzni qaytarish
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBarEdit;
