import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full font-semibold text-white bg-gray-800 rounded-md py-1 px-2"
    >
      {label}
    </button>
  );
};

export default Button;
