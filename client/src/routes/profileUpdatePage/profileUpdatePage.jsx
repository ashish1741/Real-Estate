import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser.userInfo.avatar);
  const navigate = useNavigate();

  const handleUpate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.userInfo.id}`, {
        username,
        email,
        password,
        avatar
      });

      updateUser(res.data);
      navigate("/profile");
      console.log(currentUser.userInfo.username);
    } catch (error) {
      console.log(error);
      setError(error.response.message);
    }
  };

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
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={
            avatar ||
            "https://a0.anyrgb.com/pngimg/1698/1348/no-facial-features-no-avatar-no-eyes-expressionless-flat-man-delayering-tak-user-avatar-head-portrait-flat.png"
          }
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dojqcq5eo",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            floder: "avatar",
          }}
          setAvatar={setAvatar}
        ></UploadWidget>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
