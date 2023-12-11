import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const url = "https://blog-website-s8rz.onrender.com";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    try {
      const res = await axios.post(`${url}/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      if (res) {
        const data = res.data;
        return data;
      } else {
        // Handle the case when the response is undefined
        console.error("Response is undefined");
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => {
          if (data && data.user && data.user._id) {
            localStorage.setItem("userId", data.user._id);
            dispatch(authActions.signin());
            navigate("/");
          } else {
            console.error("Invalid data structure in the response");
          }
        })
        .catch((error) => console.error(error));
    } else {
      sendRequest()
        .then((data) => {
          if (data && data.user && data.user._id) {
            localStorage.setItem("userId", data.user._id);
            dispatch(authActions.signin());
            navigate("/");
          } else {
            console.error("Invalid data structure in the response");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <div
        className="d-flex vh-100 justify-content-center align-items-center "
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 bg-transparent"></div>
            <form onSubmit={handleSubmit}>
              <div className="max-width-400 mx-auto mt-5 p-3 border rounded">
                <h3 className="text-center">
                  {isSignup ? "Sign Up" : "Sign In"}
                </h3>
                {isSignup && (
                  <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    value={inputs.name}
                    className="form-control mb-3"
                  />
                )}
                <label
                  htmlFor="formBasicEmail"
                  className="form-label text-white"
                >
                  Email address
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  value={inputs.email}
                  className="form-control mb-3"
                />
                <label
                  htmlFor="formBasicEmail"
                  className="form-label text-white"
                >
                  Password
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  value={inputs.password}
                  className="form-control mb-3"
                />
                <dir className="text-center">
                  <button type="submit" className="btn btn-warning mb-3">
                    {isSignup ? "Create Account" : "Sign In"}
                  </button>
                  <div>
                    <button
                      onClick={() => setIsSignup(!isSignup)}
                      className="btn btn-warning mb-3 "
                    >
                      {isSignup
                        ? "Have an Account? Sign In"
                        : "New User? Register Now"}
                    </button>
                  </div>
                </dir>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;





