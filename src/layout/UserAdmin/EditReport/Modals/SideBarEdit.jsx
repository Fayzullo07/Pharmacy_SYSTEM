import React from "react";

const SideBarEdit = ({ shows, setShows }) => {
  return (
    <div className="btn-toolbar w-100">
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
          type="button"
          className={`btn btn-${shows == "3" ? "primary" : "outline-primary"}`}
          onClick={() => setShows("3")}
          
        >
          <i className="fa fa-building fs-5" />
        </button>

        <button
          type="button"
          className={`px-2 btn btn-${shows == "4" ||
          shows == "5" ||
          shows == "6" ||
          shows == "7" ||
          shows == "8" ||
          shows == "9"
            ? "primary"
            : "outline-primary"} btn-sm dropdown-toggle`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-money-bill-transfer fs-5" />
        </button>
        <div className="btn-group">
         
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a
                className={`${shows == "4" && "active"} dropdown-item`}
                onClick={() => setShows("4")}
              >
                Qarzga qilingan savdo
              </a>
            </li>

            <li>
              <button
                type="button"
                className={`${shows == "5" && "active"} dropdown-item`}
                onClick={() => setShows("5")}
              >
                Qarzga qilingan savdoni qaytarish
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`${shows == "6" && "active"} dropdown-item`}
                onClick={() => setShows("6")}
              >
                Qarz berish
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`${shows == "7" && "active"} dropdown-item`}
                onClick={() => setShows("7")}
              >
                Berilgan qarzni qaytarish
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`${shows == "8" && "active"} dropdown-item`}
                onClick={() => setShows("8")}
              >
                Qarz olish
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`${shows == "9" && "active"} dropdown-item`}
                onClick={() => setShows("9")}
              >
                Olingan qarzni qaytarish
              </button>
            </li>
          </ul>
        </div>

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
    </div>
  );
};

export default SideBarEdit;
