import React from "react";

const Homepage = ({logout}) => {
  return (
    <>
      <div className="homepage page">
        <p>Homepage</p>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
};

export default Homepage;
