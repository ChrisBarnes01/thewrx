import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <div>
      <div className="center">
        <h1>The Wrx</h1>
        <div class="row">
          <div class="column">
            <h3>Live</h3>

            <img
              src={require("../../assets/live.png")}
              style={{ width: "100%", height: "100%" }}
              alt="live"
            />
          </div>
          <div class="column">
            <h3>Give</h3>

            <img
              src={require("../../assets/give.png")}
              style={{ width: "100%", height: "100%" }}
              alt="give"
            />
          </div>
          <div class="column">
            <h3>Love</h3>
            <img
              src={require("../../assets/love.png")}
              style={{ width: "100%", height: "100%" }}
              alt="love"
            />
          </div>
        </div>
        <p>The Wrx is a collaborative tool built to help you track how you live a good life. Join the beta today!</p>
      </div>
      <div className="login">
        <div className="login__container">
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button
            className="login__btn login__google"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
