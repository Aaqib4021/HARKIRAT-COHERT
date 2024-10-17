import React, { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setValue(response.data.balance);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="font-bold animate-pulse">Your balance Rs</div>;
  }

  return <div className="font-bold">Your balance Rs {value.toFixed(2)}</div>;
};

export default Balance;
