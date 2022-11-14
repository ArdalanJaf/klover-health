import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/adminSlice";

const AdminLogin = ({ setLoggedIn }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("klover_admin");
  const [password, setPassword] = useState("RichaLovesKlover88");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const results = await axios.post(API_URL + "/admin/login", {
        username: username,
        password: password,
      });

      // if username/password correct: save id + token in state, show admin page
      if (results.data.status === 1) {
        dispatch(
          setLogin({ userId: results.data.userId, token: results.data.token })
        );
        setLoggedIn(true);
      } else if ((results.data.status = 2)) {
        setError(results.data.error);
      }
      console.log(results.data);
    } catch (error) {
      alert("API down " + error);
    }
  };

  return (
    <div className="container">
      <label>
        Username:{" "}
        <input
          required
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
      </label>

      <label>
        Password:{" "}
        <input
          required
          type={passwordShown ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </label>

      <label>
        <input
          type="checkbox"
          value={passwordShown}
          onChange={() => setPasswordShown(!passwordShown)}
        />{" "}
        show password
      </label>

      <input
        type="submit"
        onClick={() => handleSubmit()}
        disabled={username && password ? false : true}
      />

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
