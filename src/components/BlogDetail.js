import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function BlogDetail() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };
  const url = "https://blog-website-s8rz.onrender.com"

  const fetchDetails = async () => {
    const res = await axios
      .get(`${url}/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))  
      .then(() => navigate("/myBlogs"));
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data);
      setInputs({
        title: data.blog.title,
        content: data.blog.content,
        image: data.blog.image,
      });
    });
  }, [id]);
console.log(blog)

  const sendRequest = async () => {
    const res = await axios
      .put(`${url}/api/blog/update/${id}`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <div
            className="border border-secondary rounded p-3 mx-auto mt-5"
            style={{
              boxShadow: "10px 10px 20px #ccc",
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
              Update your Blog
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
              className="btn btn-warning mt-2 rounded"
              type="submit"
            >
              Submit Blog
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
