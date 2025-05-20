import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import gear from "../../assets/gear.png";
import pfp from "../../assets/pfp.png";

const Active = () => {
  return (
    <div className="flex justify-between mx-20 mt-6">
      <img src={logo} alt="" className="w-[219px] h-[57px]" />

      <div className="flex justify-between relative gap-4 items-center">
        <Link to="/lawyersettings">
          <img
            src={gear}
            className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
            alt="Settings"
          />
        </Link>
        <div className="flex justify-between gap-1.5">
          <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
          <p className="text-neutral-600 font-semibold">{lawyer.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Active;
