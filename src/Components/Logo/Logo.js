import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="mh4 mt0 ">
      <Tilt
        className="Tilt br2 shadow-2"
        glareEnable={true}
        glareMaxOpacity={0.8}
        glareColor="#ffffff"
        glarePosition="bottom"
        style={{
          height: "150px",
          width: "150px",
        }}
      >
        <div className="pa3">
          <img src={brain} alt="brain" style={{ paddingTop: "7px" }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
