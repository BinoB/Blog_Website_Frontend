import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ textDecoration: "none", color: "white" }}>
          Blog App
        </Link>

        {isLoggedIn && (
          <div className="navbar-nav ms-auto">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${value === 0 && "active"}`} onClick={() => setValue(0)}>
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myBlogs" className={`nav-link ${value === 1 && "active"}`} onClick={() => setValue(1)}>
                  My Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs/add" className={`nav-link ${value === 2 && "active"}`} onClick={() => setValue(2)}>
                  Add Blogs
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="navbar-nav ms-auto">
          {!isLoggedIn && (
            <>
              <Link to="/auth" className="btn btn-outline-light me-1">
                Sign In
              </Link>
              <Link to="/auth" className="btn btn-outline-light me-1">
                Sign Up
              </Link>
            </>
          )}
          {isLoggedIn && (
           <div>
             
            <Link to="/profile" className="btn  btn-outline-light me-1">
                Profile
              </Link>
              <button
              onClick={() => dispatch(authActions.logout())}
              className="btn btn-outline-light me-1"
            >
              Log Out
            </button>
           </div>
            
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
