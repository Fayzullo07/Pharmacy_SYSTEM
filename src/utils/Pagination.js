import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
    const { page, pages, route, pharmacy, month, year, expense } = props;
    return (
        pages > 1 && (
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(pages).keys()].map((x) => (
                        <li
                            className={`page-item ${x + 1 == page ? "active" : ""}`}
                            key={x + 1}
                        >
                            <Link
                                className="page-link"
                                to={expense ? `${route}/${x + 1}/${year}/${month}/${pharmacy}/${expense}` : `${route}/${x + 1}/${year}/${month}/${pharmacy}`}
                            >
                                {x + 1}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    );
};

export default Pagination;
