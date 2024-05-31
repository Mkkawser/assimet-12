import React from "react";
import { NavLink, useParams } from "react-router-dom";

const NotFound = () => {
  const param = useParams();
  return (
    <>
      <div className="not-found-container">
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
        <div className="flex items-center justify-center">
          <img src={"/images/404-error.jpg"} alt="404 Not Found" />
        </div>
        <NavLink to={"/"} className="btn btn-success">
          Home
        </NavLink>
      </div>
    </>
  );
};

export default NotFound;
