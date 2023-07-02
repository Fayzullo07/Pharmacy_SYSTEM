import React from "react";

const Textarea = ({
  name = "desc",
  value,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        placeholder="Izoh qoldirish"
        id="floatingTextarea2"
        style={{ height: "100px" }}
        name={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <label htmlFor="floatingTextarea2">Izoh qoldirish</label>
    </div>
  );
};

export default Textarea;
