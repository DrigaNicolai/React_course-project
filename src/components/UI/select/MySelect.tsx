import React from 'react';

interface MySelectProps {
  options: {
    value: string | number,
    name: string
  }[],
  defaultValue: string,
  value: string | number,
  onChange: (e: string | number) => void
}

const MySelect = ({options, defaultValue, value, onChange}: MySelectProps) => {
  return (
    <select
      value={value}
      onChange={event => onChange(event.target.value)}
    >
      <option disabled value="">{defaultValue}</option>
      { options.map((option: any) =>
          <option key={option.value} value={option.value}>
            { option.name }
          </option>
        ) 
      }
    </select>
  );
};

export default MySelect;
