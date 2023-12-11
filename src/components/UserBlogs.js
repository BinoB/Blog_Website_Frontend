import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Grid } from "@mui/material";

function UserBlogs() {
  const url = "https://blog-website-s8rz.onrender.com"

  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`${url}/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {user &&
          user.blogs &&
          user.blogs.map((blog) => (
            <div key={blog._id} className="col">
              <Blog
                id={blog._id}
                isUser={true}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                userName={user.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserBlogs;
