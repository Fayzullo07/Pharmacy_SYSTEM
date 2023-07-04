import React from "react";

import "./SearchInput.css";

const SearchInput = ({ search, setSearch, setPage }) => {
  return (
    <div className="search">
      <label>
        <i
          class="fa-solid fa-magnifying-glass text-muted"
        />
        <input
          type="text"
          placeholder={`Izlash . . . `}
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
