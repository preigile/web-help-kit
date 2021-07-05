import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <div className={style.root}>
      <Router>
        <Link to={"/web-help-kit"} className={style.link}>
          Home
        </Link>
      </Router>
    </div>
  );
};

export default Header;
