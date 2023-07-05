import React from "react";

const SmenaSelect = ({
  name,
  value,
  handleInputChange,
  isRequired = false
}) => {
  return (
    <div className="form-floating">
      <select
        className="form-select mb-3"
        name={name}
        value={value}
        onChange={handleInputChange}
      >
        <option selected>Smena tanlang. . .</option>
        <option value={1}>Smena 1</option>
        <option value={2}>Smena 2</option>
        <option value={3}>Smena 3</option>
      </select>
      <label>
        Smena tanlang {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default SmenaSelect;
