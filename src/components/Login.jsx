import React from "react";

const Login = ({ AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPES_URL_PARAM }) => {
  return (
    <>
      <div className="login">
        <div className="login__button">
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}`}
            className="login__button-link">
            Login with Spotify
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
