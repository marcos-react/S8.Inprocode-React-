import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.BACKEND_URL}/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Text top table */}
      <div className="flex justify-start w-full max-w-5xl mt-4 gap-4">
        <h1 className="font-bold text-3xl">CRUD Database </h1>
      </div>
      {/* Table with DaisyUI styling */}
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-white text-black">
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Hobby</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.hobby}</td>
                <td className="flex flex-wrap gap-2">
                  <Link to={`/edit/${user.id}`}>
                    <button className="btn btn-sm btn-warning">Edit</button>
                  </Link>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons below table */}
      <div className="flex justify-start w-full max-w-5xl mt-4 gap-4">
        <button className="btn btn-info">Download CSV</button>
        <Link to="/add">
          <button className="btn btn-success">Add Item</button>
        </Link>
      </div>
    </div>
  );
}
