import React from "react";

import "./SearchInput.css";

const SearchInput = ({ search, setSearch, setPage }) => {
  return (
    <div className="search">
      <label>
        <input
          type="text"
          placeholder={`Search . . .`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <i class="fa-solid fa-magnifying-glass fa-beat-fade cursor_pointer"></i>
      </label>
    </div>
  );
};

export default SearchInput;
