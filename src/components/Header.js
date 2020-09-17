import React from "react";
import "../css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../StateProvider";

const Header = () => {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          className="search"
          type="text"
          placeholder="Search for Artists, Songs, or Podcasts"
          style={{ borderColor: "transparent" }}
        />
      </div>

      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt="AN" />
        <h4>Andrew Nwachuku</h4>
      </div>
    </div>
  );
};

export default Header;
