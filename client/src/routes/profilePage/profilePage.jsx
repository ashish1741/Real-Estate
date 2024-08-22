import { Suspense, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import "./profilePage.scss";

function ProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const { username, avatar, email } = currentUser.userInfo;

  const handleLogOut = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>

            <button onClick={() => navigate("/profile/update")}>
              Update Profile
            </button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={
                  avatar ||
                  "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                }
                alt=""
              />
            </span>
            <span>
              Username: <b>{username}</b>
            </span>
            <span>
              E-mail: <b>{email}</b>
            </span>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button onClick={() => navigate("/add")}>Create New Post</button>
          </div>

          <Suspense fallback={<p>Loading data ........</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading package location!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>

          <Suspense fallback={<p>Loading data ........</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading package location!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPost} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
