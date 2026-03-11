// src/VerifyToken.jsx
import React, { useEffect, useState } from "react";
import { api } from "./api/client"; // unified axios client with auth header

const VerifyToken = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // Authorization header is already attached by setAuthToken()
        const res = await api.get("/me");
        // If your /me route returns { user: {...} } you can customize this:
        setMessage(res.data?.message || "Token is valid!");
      } catch (err) {
        console.error(err);
        setMessage("Token invalid or expired!");
      }
    })();
  }, []);

  return <div>{message}</div>;
};

export default VerifyToken;
