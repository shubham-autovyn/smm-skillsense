import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./CustomToggleButton.css";

const CustomToggleButton = ({
  selected,
  labels,
  onChange,
  labelsWithIcon = false,
  buttonSx = {},
  rootClassName = "toggle-button-root",
  className = "active-toggle-button",
}) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };
  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="Toggle Button"
    >
      {labelsWithIcon
        ? labels.map((item) => (
            <ToggleButton
              key={item.label}
              value={item.label}
              style={{ width: "fit-content", ...buttonSx }}
              className={`toggle-button-root ${
                selected.toLowerCase() === item.label.toLowerCase()
                  ? className
                  : ""
              }`}
            >
              {item.icon}
              {item.label}
            </ToggleButton>
          ))
        : labels.map((item) => (
            <ToggleButton
              key={item}
              value={item}
              className={rootClassName}
              style={{ width: "fit-content", ...buttonSx }}
              classes={{
                root:
                  selected.toLowerCase() === item.toLowerCase()
                    ? className
                    : "",
              }}
            >
              {item}
            </ToggleButton>
          ))}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;
