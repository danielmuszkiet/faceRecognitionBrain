import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className="center ma4">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageURL}
          width="380px"
          height="auto"
        />

        {boxes.map((b, i) => {
          return (
            <div
              className="bounding-box"
              key={i}
              style={{
                top: b.topRow,
                right: b.rightCol,
                bottom: b.bottomRow,
                left: b.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
