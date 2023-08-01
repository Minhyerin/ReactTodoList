import React from "react";

const Header = () => {
  return (
    <div className="Header">
      <h1>My Todo List</h1>
      <span>
        Today is...💬<span className="today">{new Date().toDateString()}</span>
      </span>
    </div>
  );
};

export default Header;
