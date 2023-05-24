import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import "./css/login-register.css";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("please enter all the required fields!");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match!");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    <>
      <div class="mwb-form-main-wrapper">
        <div class="mwb-form-main-container">
          <h1>Register</h1>
          <form action="#" onSubmit={handleSubmit}>
            <div class="mwb-form-group">
              <label for="nameInput" className="define-label">Your Name</label>
              <input
                class="mwb-form-control"
                type="text"
                id="nameInput"
                name="name"
                value={credentials.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />

              <div class="mwb-form-error">This Field Required*</div>
            </div>

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
              <label for="passwordInput" className="define-label">Password</label>
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
              <label for="confirmPassword" className="define-label">Confirm Password</label>
              <input
                type="password"
                class="mwb-form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                placeholder="Enter Password"
                required
              />
              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <input
                type="submit"
                value="Register"
                class="mwb-form-submit-btn"
              />
              <p>
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
