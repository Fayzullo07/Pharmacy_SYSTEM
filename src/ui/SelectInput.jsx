import React, { useEffect, useState } from 'react'

const SelectInput = ({
    name,
    value,
    handleInputChange,
    isRequired = false,
    placeholder = "",
    data
}) => {

    const [placeholderInput, setPlaceholderInput] = useState("");

    useEffect(
        () => {
            switch (placeholder) {
                case "Filialni tanlang":
                    setPlaceholderInput("Filialni tanlang");
                    break;
                default:
                    setPlaceholderInput("Select");
            }
        },
        [placeholder]
    );
    return (
        <div className="form-floating">
            <select
                className="form-select mb-3"
                name={name}
                value={value}
                onChange={handleInputChange}
            >
                <option value="">{placeholderInput} . . .</option>
                {data.map(item =>
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                )}
            </select>
            <label>
                {placeholderInput}{" "}
                {isRequired ? <b className="text-danger">*</b> : null}
            </label>
        </div>
    )
}

export default SelectInput
