import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./css/login-register.css";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
  const { toast } = useContext(ToastContext);
  const { loginUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("please enter all the required fields!");
      return;
    }

    loginUser(credentials);
  };

  return (
    <>
      <div class="mwb-form-main-wrapper">
        <div class="mwb-form-main-container">
          <h1>Login</h1>
          <form action="#" onSubmit={handleSubmit}>
            <div class="mwb-form-group">
              <label htmlFor="emailInput" className="define-label">Email address</label>
              <input
                class="mwb-form-control"
                type="email"
                id="emailInput"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required
              />
              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <label htmlFor="passwordInput" className="define-label">Password</label>
              <input
                type="password"
                class="mwb-form-control"
                id="passwordInput"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                required
              />
              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <input type="submit" value="Login" class="mwb-form-submit-btn" />
              <p>
                Don't have an account ? <Link to="/register">Create One</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
