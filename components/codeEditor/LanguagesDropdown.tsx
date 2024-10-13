"use client"
import Select from "react-select";
import { customStyles } from "@/constants/customStyles";
import { languageOptions } from "@/constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }: any) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
