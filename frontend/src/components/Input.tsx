import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, value, onChange }: InputProps) {
  return (
    <div className="grid grid-cols-3">
      <label className="text-right mr-5 col-span-1">
        {label[0].toUpperCase() + label.toLowerCase().slice(1)}:
      </label>
      <input
        type="text"
        className="p-1 col-span-2"
        value={value}
        placeholder={`your ${label}...`}
        onChange={onChange}
        required
      ></input>
    </div>
  );
}

export default Input;
