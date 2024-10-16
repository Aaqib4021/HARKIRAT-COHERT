import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div className="mt-6">
      <div className="font-bold mt-2 text-lg">Users</div>
      <div>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder="Search Users"
          className="px-2 py-1 border border-slate-200 rounded w-full mb-4"
        />
      </div>
      <div>
        {users.map((user, index) => (
          <User user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-4">
      <div className="flex gap-2">
        <div className="w-12 h-12 bg-slate-300 rounded-full flex justify-center">
          <div className="h-full flex flex-col justify-center text-xl">H</div>
        </div>
        <div className="flex flex-col justify-center">
          {user.firstname} {user.lastname}
        </div>
      </div>
      <div className=" h-full px-4">
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user.id + "&name=" + user.firstname);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

export default Users;
