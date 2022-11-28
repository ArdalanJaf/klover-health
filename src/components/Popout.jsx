import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectProduct } from "../redux/contactSlice";

function Popout({ component }) {
  const dispatch = useDispatch();

  // click-outside = close
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(selectProduct(""));
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const popoutOuterStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    zIndex: "2",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const popoutInnerStyle = {
    height: "100%", // overflowY: "scroll",
  };

  return (
    <div style={popoutOuterStyle}>
      <div
        ref={wrapperRef}
        style={popoutInnerStyle}
        className="py-sm-3 d-flex align-items-center"
      >
        {component}
      </div>
    </div>
  );
}

export default Popout;
