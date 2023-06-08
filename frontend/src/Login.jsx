import { useState } from "react";

function Login({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="auth-form-container">
      <h1 id="auth-form-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a onClick={() => toggleForm("Signup")}>Register here</a>.
      </p>
    </div>
  );
}

export default Login;
