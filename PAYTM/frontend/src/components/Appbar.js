import React from "react";

const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="h-full ml-4 flex flex-col justify-center font-medium">
        Mtm App
      </div>
      <div className="flex">
        <div className="h-full mr-4 flex flex-col justify-center ">Hello</div>
        <div className="bg-slate-200 w-12 h-12 rounded-full flex justify-center">
          <div className="h-full flex flex-col justify-center text-xl">U</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
