import React from "react";

function JoiErrorNote({ error }) {
  return <span className="small text-danger text-center d-block">{error}</span>;
}

export default JoiErrorNote;
