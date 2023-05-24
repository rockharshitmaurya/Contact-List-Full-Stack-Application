import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import "./css/login-register.css";

const EditContact = () => {
  const URL="https://contact-go.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`${URL}/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`updated [${userDetails.name}] contact`);

      setUserDetails({ name: "", address: "", email: "", phone: "" });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setUserDetails({
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>

        <div class="mwb-form-main-wrapper">
        <div class="mwb-form-main-container">
          <h1>Edit your contact</h1>
          <form action="#" onSubmit={handleSubmit}>
            <div class="mwb-form-group">
            <label htmlFor="nameInput" className="define-label">
                Name Of Person
              </label>
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
            <label htmlFor="addressInput"  className="define-label">
                Address Of Person
              </label>
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
            <label htmlFor="emailInput" className="define-label">
                Email Of Person
              </label>
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
            <label htmlFor="phoneInput"  className="define-label">
                Phone Number Of Person
              </label>
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
              value="Save Changes"
              className="mwb-form-submit-btn"
            />
            </div>
          </form>
        </div>
      </div>


        </>
      )}
    </>
  );
};

export default EditContact;