"use client"
import Select from "react-select";
import {monacoThemes} from "@/lib/defineTheme";
import { customStyles } from "@/constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }: any) => {
  return (
    <Select
      placeholder={`Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
