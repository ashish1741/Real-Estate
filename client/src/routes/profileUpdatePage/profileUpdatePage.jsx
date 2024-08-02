import { useContext } from "react";
import "./profileUpdatePage.scss";
import {AuthContext} from "../../context/AuthContext"

function ProfileUpdatePage() {
  const {currentUser , updateUser} =  useContext(AuthContext);






  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
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
