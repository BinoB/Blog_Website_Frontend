// Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = ()=> {
  const user = useSelector((state) => state.user);
  const userId = user ? user._id : null; // Check if user is defined
  console.log(`this is userId ${userId}`);
  const url = "https://blog-website-s8rz.onrender.com";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) { // Check if userId is defined
          const res = await axios.get(`${url}/api/user/profile/${userId}`);
          const data = res.data;
          setProfile(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2>User Profile</h2>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Photo:</strong> {profile.photo}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
