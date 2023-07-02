import React, { useState } from "react";

import "./SearchInput.css";
import { toast } from "react-toastify";

const SearchInput = ({ search, setSearch, setPage }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value && value.length < 3) {
      toast.warning("Eng kami 3ta symbol bo'lishi kerak!");
      return;
    }
    setSearch(value);
    setPage(1);
  };
  return (
    <div className="search">
      <label>
        <input
          type="text"
          placeholder={`Izlash . . . `}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key == "Enter") {
              handleSubmit();
            }
          }}
        />
        <i
          class="fa-solid fa-magnifying-glass cursor_pointer"
          onClick={handleSubmit}
        />
      </label>
    </div>
  );
};

export default SearchInput;
