import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate =   useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", {
        username,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }finally{
      setisLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
