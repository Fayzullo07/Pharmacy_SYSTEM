import React from "react";

import "./SearchInput.css";
import { useTranslation } from "react-i18next";

const SearchInput = ({ search, setSearch, setPage }) => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <div className="search">
      <label>
        <i
          class="fa-solid fa-magnifying-glass text-muted"
        />
        <input
          type="text"
          placeholder={`${g(63)} . . . `}
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
          onKeyDown={e => {
            if (e.key == "Enter") {
              handleSubmit();
            }
          }}
        />
      </label>
    </div>
  );
};

export default SearchInput;
