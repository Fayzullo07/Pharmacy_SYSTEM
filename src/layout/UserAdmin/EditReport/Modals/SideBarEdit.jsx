import React, { useState } from "react";
import "./SideBarEdit.css";
import {
  debt_png,
  discount_png,
  expense_png,
  firm_png,
  income_png,
  return_png,
  team
} from "../../../../assets";

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
          <img src={expense_png} width={30} alt="income" />
        </button>
        <button
          type="button"
          className={`btn btn-${shows == "2" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("2")}
        >
          <img src={income_png} width={30} alt="expense" />
        </button>
        <button
          id="btn_hover"
          type="button"
          className={`btn btn-${shows == "3" ? "primary" : "outline-primary"}`}
          onClick={() => {
            setShows("3");
          }}
        >
          <img src={firm_png} width={30} alt="firm" />
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
          <img src={debt_png} width={30} alt="debts" />
        </button>

        <button
          type="button"
          className={`btn btn-${shows == "10" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("10")}
        >
          <img src={return_png} width={30} alt="return" />
        </button>
        <button
          type="button"
          className={`btn btn-${shows == "11" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("11")}
        >
          <img src={discount_png} width={30} alt="discount" />
        </button>
        <button
          type="button"
          className={`btn btn-${shows == "12" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("12")}
        >
          <img src={team} width={30} alt="team" />
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
        style={showUl ? { display: "block" } : { display: "none" }}
      >
        <li className={`${shows == "4" && "active"}`}>
          <button
            className={`${shows == "4" && "active"} dropdown-item`}
            onClick={() => {
              setShows("4");
              setShowUl(false);
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
           
          >
            Olingan qarzni qaytarish
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBarEdit;
