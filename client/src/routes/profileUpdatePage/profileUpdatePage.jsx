import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import {AuthContext} from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
  const {currentUser , updateUser} =  useContext(AuthContext);
  const [error, setError] = useState("");
    

   const handleUpate = async (e) => {
    e.preventDefault();


    const formData =  new FormData(e.target);
    const {username , email , password} =  Object.fromEntries(formData);

    

    try {
      
      console.log(`id:${currentUser.userInfo.id}`);
      
      const res =  await apiRequest.put(`/users/${currentUser.userInfo.id}`,{username, email, password});
      console.log(`response is : ${res.data}`);
      
      updateUser(res.data);

      
      
    } catch (error) {
      console.log(error);
      setError( error.response.message);
    }

   }





  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpate}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.userInfo.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.userInfo.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"   />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.userInfo.avatar || 
          "https://a0.anyrgb.com/pngimg/1698/1348/no-facial-features-no-avatar-no-eyes-expressionless-flat-man-delayering-tak-user-avatar-head-portrait-flat.png"}
           alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
