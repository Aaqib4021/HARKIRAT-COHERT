import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white w-80 h-max p-2 px-4 text-center rounded-lg">
          <Heading label={"Sign In"} />
          <SubHeading
            label={"Enter your credentials to access your account "}
          />
          <InputBox placeholder={"aaqib@gmail.com"} label={"Email"} />
          <InputBox placeholder={"123456"} label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
