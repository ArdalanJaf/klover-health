import React from "react";

function Success({ setBooked }) {
  return (
    <div
      className="container-sm text-center bg-light rounded p-5 maxHeightOnPhone d-flex flex-column justify-content-center"
      // style={{ maxWidth: "550px" }}
    >
      <h2 className="text-success display-3 mb-4">Booking comfirmed.</h2>
      <p className="lead">
        A confirmation email has been sent to you. I will contact you before our
        appointment, but if you need to contact me sooner please use the contact
        form below.
      </p>
      <div className="pt-3 d-flex justify-content-center align-items-center flex-column flex-sm-row">
        <a
          className="btn btn-primary m-1 btn-lg"
          href="#contact"
          onClick={() => setBooked(false)}
        >
          Contact
        </a>
        <button
          className="btn btn-outline-secondary m-1 btn-lg maxWidthOnPhone"
          onClick={() => setBooked(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Success;