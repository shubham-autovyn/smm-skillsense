import {
  SelectBox,
  SelectLabel,
  SelectOption,
} from "./FilterSelectInput.style";

const FilterSelectInput = ({ label, name, options, onChange, optionbold }) => {
  return (
    <SelectBox>
      <SelectLabel htmlFor={name}>{label}</SelectLabel>
      <SelectOption
        name={name}
        id={name}
        onChange={onChange}
        style={{ fontWeight: optionbold ? "bold" : "normal" }}
      >
        {options?.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </SelectOption>
    </SelectBox>
  );
};

export default FilterSelectInput;
