import React from "react";
import { useController } from "react-hook-form";
import "./Radio.css";

const CommonRadio = ({ name, control, options }) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: options[0]?.value || "",
  });

  return (
    <div className="radio-button-group">
      {options.map((option) => (
        <label key={option.value} className="radio-label">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          <div className="radio-custom"></div>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CommonRadio;
