import React from "react";

const Homepage = ({logout}) => {
  return (
    <>
      <div className="homepage">
        Homepage
      </div>
      <button onClick={logout}>Logout</button>
    </>
  )
};

export default Homepage;
