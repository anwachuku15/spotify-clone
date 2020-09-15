import React from "react";
import "../css/SidebarOption.css";
// import {} from "@";

const SidebarOption = ({ option, Icon }) => {
  return (
    <div className="sidebarOption">
      <p>{option}</p>
    </div>
  );
};

export default SidebarOption;
