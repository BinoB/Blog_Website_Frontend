import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailedBlog = () => {
 const { id } = useParams();
 const [blog, setBlog] = useState({});

 const url = "https://blog-website-s8rz.onrender.com"

 const fetchBlog = async () => {
    const res = await axios.get(`${url}/api/blog/${id}`);
    setBlog(res.data);
 };

 useEffect(() => {
    fetchBlog();
 }, []);

 return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <img src={blog.image} alt={blog.title} />
    </div>
 );
};

export default DetailedBlog;