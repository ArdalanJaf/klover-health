import React from "react";

function Spacer({ linkId }) {
  let id = "";
  if (linkId) id = linkId;
  return (
    <div
      id={id}
      style={{ height: "55.99px", width: "100%" }}
      className="mb-2"
    ></div>
  );
}

export default Spacer;
