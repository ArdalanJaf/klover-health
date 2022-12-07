import React from "react";

function Footer({ style }) {
  return (
    <div className="text-center text-dark mt-5 mb-3 w-100" style={style}>
      <small>
        © 2022 Richa Shukla.{" "}
        <span style={{ opacity: "0.7" }}>
          Web-design @
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
