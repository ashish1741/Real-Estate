import { useContext, useState } from "react";
import "./login.scss";
import { json, Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";


function Login() {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate =   useNavigate()
  const {updateUser} =  useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

       updateUser(res.data)
      navigate("/")

    } catch (error) {
      setError(error.response.data.message);
    }finally{
      setisLoading(false);
    }
  };

  

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register"> 
          Don't you have an account?
          </Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
