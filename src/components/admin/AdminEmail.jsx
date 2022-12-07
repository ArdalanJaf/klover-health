import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setContact } from "../../redux/adminSlice";

function AdminEmail() {
  const token = useSelector((state) => state.admin.login.token);
  const { contact } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [localContact, setLocalContact] = useState("");

  const getContact = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/contact", {
        headers: { token: token },
      });
      dispatch(setContact(results.data.email));
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/update_contact", payload, {
        headers: { token: token },
      });
      getContact();
      setLocalContact("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="mb-2">Email</h2>
      <p>
        Change your email address simply by entering a new email and clicking
        "Update Email".
      </p>
      <div className="alert alert-warning">
        Remember: if your email is incorrect you will not recieve booking
        confirmations or contact messages. Please double check your email
        address is correct.
      </div>
      <div className="d-flex flex-column align-items-center">
        {contact ? (
          <h4>{contact}</h4>
        ) : (
          <div className="alert alert-danger text-start">
            Danger: you currently have no email address registered.
          </div>
        )}
        <input
          className="form-control text-center mb-3 mt-1"
          value={localContact}
          onChange={(e) => setLocalContact(e.target.value)}
          style={{ maxWidth: "280px" }}
          placeholder="Enter email..."
          name="email"
        ></input>
        <button
          className="btn btn-primary text-center shadow"
          onClick={() => updateContact({ email: localContact })}
          disabled={localContact ? false : true}
        >
          Update Email
        </button>
      </div>
    </div>
  );
}

export default AdminEmail;
