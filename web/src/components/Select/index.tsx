import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} value="" {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {options.map(option => (
          <option
            key={options.indexOf(option)}
            value={option.value}
            label={option.label}
          />
        ))}
      </select>
    </div>
  );
};

export default Select;
