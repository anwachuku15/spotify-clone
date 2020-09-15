import React from "react";
import "../css/SidebarOption.css";
// import {} from "@";

const SidebarOption = ({ option, Icon }) => {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h5>{option}</h5> : <p>{option}</p>}
    </div>

    // <hr />
  );
};

export default SidebarOption;
