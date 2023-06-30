import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";

const SideBarEdit = ({ choose, setChoose }) => {
  return (
    <SideBar title="Nazorat" icon="fa fa-list">
      <ul className="list-group">
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("1")}
          className={`${
            choose == "1" && "active"
          } list-group-item cursor_pointer`}
          aria-current={!choose}
        >
          <i className="fa fa-arrow-up mx-2 border p-1 px-2 rounded"></i>
          Tushumlar
        </li>
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("2")}
          className={`${
            choose == "2" && "active"
          } list-group-item cursor_pointer`}
          aria-current={choose}
        >
          <i className="fa fa-arrow-down mx-2 border p-1 px-2 rounded"></i>{" "}
          Xarajatlar
        </li>

        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("3")}
          className={`${choose == "3" && "active"} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-building mx-2 border p-1 px-2 rounded"></i>{" "}
          Firmaga chiqim
        </li>

        <li
          className={`${
            choose == "4" ||
            choose == "5" ||
            choose == "6" ||
            choose == "7" ||
            choose == "8" ||
            choose == "9"
              ? "active"
              : ""
          } list-group-item`}
        >
          <div
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className={` d-flex justify-content-between align-items-center `}
          >
            <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
            <span className="flex-grow-1"> Qarz oldi-berdi</span>
            <i className="fa fa-angle-down   p-1 px-2 rounded"></i>{" "}
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            <li
              data-bs-dismiss="offcanvas"
              onClick={() => setChoose("4")}
              className={`${choose == "4" && "active"} list-group-item `}
              aria-current={choose}
            >
              <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
              Qarzga qilingan savdo
            </li>

            <li
              data-bs-dismiss="offcanvas"
              onClick={() => setChoose("5")}
              className={`${choose == "5" && "active"} list-group-item `}
              aria-current={choose}
            >
              <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
              Qarzga qilingan savdoni qaytarish
            </li>

            <li
              data-bs-dismiss="offcanvas"
              onClick={() => setChoose("6")}
              className={`${choose == "6" && "active"} list-group-item `}
              aria-current={choose}
            >
              <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
              Qarz berish
            </li>

            <li
              data-bs-dismiss="offcanvas"
              onClick={() => setChoose("7")}
              className={`${choose == "7" && "active"} list-group-item `}
              aria-current={choose}
            >
              <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
              Berilgan qarzni qaytarish
            </li>

            <li
              data-bs-dismiss="offcanvas"
              onClick={() => setChoose("8")}
              className={`${choose == "8" && "active"} list-group-item `}
              aria-current={choose}
            >
              <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
              Qarz olish
            </li>
            <li
              data-bs-dismiss="offcanvas"
              onClick={() => setChoose("9")}
              className={`${choose == "9" && "active"} list-group-item `}
              aria-current={choose}
            >
              <i className="fa fa-money-check-dollar mx-2 border p-1 px-2 rounded"></i>{" "}
              Olingan qarzni qaytarish
            </li>
          </ul>
        </li>

        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("10")}
          className={`${choose == "10" && "active"} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-rotate-left mx-2 border p-1 px-2 rounded"></i>{" "}
          Qaytarib olingan mahsulot
        </li>
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("11")}
          className={`${choose == "11" && "active"} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-cart-shopping mx-2 border p-1 px-2 rounded"></i>{" "}
          Chegirma bilan savdo
        </li>
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("12")}
          className={`${choose == "12" && "active"} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-users mx-2 border p-1 px-2 rounded"></i>{" "}
          Xodimlarga berilgan summa
        </li>
      </ul>
    </SideBar>
  );
};

export default SideBarEdit;
