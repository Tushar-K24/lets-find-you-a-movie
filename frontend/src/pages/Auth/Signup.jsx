import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/auth/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="auth-screen">
      <div className="auth-form-container">
        <h1 id="auth-form-title">Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="toggle-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
