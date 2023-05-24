import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import "./css/login-register.css";

const CreateContact = () => {
  const URL="https://contact-go.onrender.com";
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`${URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${userDetails.name}] contact`);

      setUserDetails({ name: "", address: "", email: "", phone: "" });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div class="mwb-form-main-wrapper">
        <div class="mwb-form-main-container">
          <h1>Create your contact</h1>
          <form action="#" onSubmit={handleSubmit}>
            <div class="mwb-form-group">
              <label htmlFor="nameInput">Name Of Person</label>
              <input
                type="text"
                class="mwb-form-control"
                id="nameInput"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />

              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <label htmlFor="addressInput">Address Of Person</label>
              <input
                type="text"
                class="mwb-form-control"
                id="addressInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="WalkStreet 05, California"
                required
              />
              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <label htmlFor="emailInput">Email Of Person</label>
              <input
                type="email"
                class="mwb-form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required
              />
              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <label htmlFor="phoneInput">Phone Number Of Person</label>
              <input
                type="number"
                class="mwb-form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="+977 987654321"
                required
              />
              <div class="mwb-form-error">This Field Required*</div>
            </div>

            <div class="mwb-form-group">
              <input
                type="submit"
                value="Add Contact"
                class="mwb-form-submit-btn"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
