import React from "react";
import { useSelector } from "react-redux";

function JoiErrorNote({ inputName }) {
  const joiErrors = useSelector((state) => state.contact.joiErrors);

  return <p>{joiErrors[inputName]}</p>;
}

export default JoiErrorNote;
