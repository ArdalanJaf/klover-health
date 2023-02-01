import React from "react";
import { URL } from "../API/URL";

function Footer({ style }) {
  return (
    <div className="text-center text-dark pt-5 mt-5 mb-3 w-100" style={style}>
      <small>
        © 2023 Klover Healthcare -{" "}
        <a href={URL + "/terms"}>Terms & Conditions</a>
        {" - "}
        <a href={URL + "/modernslaverypolicy"}>Modern Slavery Policy</a>.{" - "}
        <span style={{ opacity: "0.7" }}>
          Website @{" "}
          <a
            className="link-dark text-decoration-none"
            href="https://ardalanjaf.com/"
          >
            ArdalanJaf
          </a>
          .
        </span>
      </small>
    </div>
  );
}

export default Footer;
