import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className=" py-2 flex text-sm justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
