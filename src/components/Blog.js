import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  
  const navigate = useNavigate();
  const handleEdit = (event) => {
    navigate(`/myBlogs/${id}`);
  };
  const url = "https://blog-website-s8rz.onrender.com"


  const deleteRequest = async () => {
    const res = await axios
      .delete(`${url}/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <div>
      <div
        className="blog-card mx-auto mt-1"
        style={{
          width: "100%",
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        <div className="card-header">
          {/* <div className="avatar" style={{ backgroundColor: "gray" }}>
            {userName && userName.charAt(0)}
          </div> */}
          <div className="title">{title}</div>
        </div>
        <img
          src={image}
          alt="Blog"
          className="card-img-top"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="card-body">
          <hr />
          <br />
          <p className="card-text ">
            <b>{userName}</b>: {content}
          </p>
          <button className="btn btn-outline-success mr-2">Detail</button>
          <button className="btn btn-btn-secondary">Comment</button>
        </div>
        {isUser && (
          <div className="card-footer d-flex p-3 ">
            <button
              className="btn btn-info ms-auto"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
