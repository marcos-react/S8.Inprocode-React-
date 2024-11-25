import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
    hobby: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/users`)
        .then((response) => {
          const user = response.data.find((u) => u.id === parseInt(id));
          if (user) setForm(user);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Edit user
      axios
        .put(`http://localhost:5000/users/${id}`, form)
        .then(() => navigate("/"))
        .catch((error) => console.error(error));
    } else {
      // Create new user
      axios
        .post("http://localhost:5000/users", form)
        .then(() => navigate("/"))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">{id ? "Edit User" : "Add Item"}</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Firstname</span>
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={form.firstname}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Lastname</span>
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Lastname"
            value={form.lastname}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Hobby</span>
          </label>
          <input
            type="text"
            name="hobby"
            placeholder="Hobby"
            value={form.hobby}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
