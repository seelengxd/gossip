import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, value, onChange }: InputProps) {
  return (
    <div className="grid grid-cols-2">
      <label className="text-right mr-5">
        {label[0].toUpperCase() + label.toLowerCase().slice(1)}:
      </label>
      <input
        type="text"
        className="p-1"
        value={value}
        placeholder={`your ${label}...`}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default Input;
