import React from "react";
import { useTranslation } from "react-i18next";

const SideBar = ({
  children,
  title = "Sanani tanlang",
  icon = "fa fa-filter",
  id,
}) => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  title = g(31)
  return (
    <>
      <button
        className="btn btn-sm mx-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasExample${id}`}
        aria-controls="offcanvasExample"
        style={{ background: "var(--blue)", color: "var(--g_white)" }}
      >
        <i className={icon}></i>
      </button>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id={`offcanvasExample${id}`}
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            {title}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">{children}</div>
      </div>
    </>
  );
};

export default SideBar;
