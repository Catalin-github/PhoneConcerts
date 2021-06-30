import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <div className="error-page">
        <h1>Oops !</h1>
        <p>Sorry, This page doesn't exist</p>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
};
export default Error;
