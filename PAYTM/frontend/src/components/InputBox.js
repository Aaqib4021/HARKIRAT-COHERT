import React from "react";

const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className=" font-medium w-full px-2 py-1 border rounded"
      />
    </div>
  );
};

export default InputBox;
