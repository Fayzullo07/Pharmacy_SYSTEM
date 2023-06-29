import React from "react";

const PaginationForModal = (props) => {
  const { page, pages, setPage } = props;
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
            >
              <button
                className="page-link"
                style={x + 1 === page ? { background: "var(--blue)" } : {}}
                onClick={() => {
                  setPage(x + 1);
                }}
              >
                {x + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default PaginationForModal;
