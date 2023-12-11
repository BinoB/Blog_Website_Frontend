import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const url = "https://blog-website-s8rz.onrender.com";

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${url}/api/blog/add`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      });

      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await sendRequest();

    if (data) {
      console.log(data);
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className="border border-primary rounded p-3 mx-auto mt-5"
          style={{
            boxShadow: "5px 5px 10px #ffe648",
            width: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontWeight: "bold",
              padding: "1rem",
              color: "gray",
              textAlign: "center",
            }}
          >
            Create your Blog
          </h3>
          <label className="mb-1 mt-2" style={{ fontSize: "24px", fontWeight: "bold" }}>
            Title
          </label>
          <input
            name="title"
            onChange={handleChange}
            value={inputs.title}
            className="form-control mb-3"
          />
          <label className="mb-1 mt-2" style={{ fontSize: "24px", fontWeight: "bold" }}>
            Content
          </label>
          <textarea
            name="content"
            onChange={handleChange}
            value={inputs.content}
            className="form-control mb-3"
          />
          <label className="mb-1 mt-2" style={{ fontSize: "24px", fontWeight: "bold" }}>
            ImageURL
          </label>
          <input
            name="image"
            onChange={handleChange}
            value={inputs.image}
            className="form-control mb-3"
          />
          <button
            className="btn btn-warning mt-5 rounded"
            style={{ width: "200px", margin: "auto" }}
            type="submit"
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
