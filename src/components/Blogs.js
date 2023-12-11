import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const url = "https://blog-website-s8rz.onrender.com"

  const sendRequest = async () => {
    const res = await axios
      .get(`${url}/api/blog`)
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="col">
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              userName={blog.user.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;









