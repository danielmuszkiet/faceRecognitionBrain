import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 form">
          <input
            className="f4 pa2 w-70 center "
            type="text"
            onChange={onInputChange}
            name="urltext"
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 ml1 br1 grow f5 link ph3 pv2 ba b--black-30 white bg-dark-green "
            name="btn"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
