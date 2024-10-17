import React from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="h-full ml-4 flex flex-col justify-center font-medium">
        Mtm App
      </div>
      <div className="flex items-center gap-3">
        <div className="h-full flex flex-col justify-center ">Hello</div>
        <div className="bg-slate-200 w-12 h-12 rounded-full flex justify-center">
          <div className="h-full flex flex-col justify-center text-xl">👤</div>
        </div>
        <button
          className="mr-2 bg-red-500 px-2 py-1 rounded text-white font-medium"
          onClick={(e) => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Appbar;
