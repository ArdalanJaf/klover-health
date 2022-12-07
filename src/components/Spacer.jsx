import React from "react";

function Spacer({ linkId }) {
  let id = "";
  if (linkId) id = linkId;
  return (
    <div
      id={id}
      style={{
        height: "55px",
        marginBottom: "55px",
        width: "100%",
      }}
      className="border-bottom border-1"
    ></div>
  );
}

export default Spacer;
