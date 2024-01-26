import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecogntion from "./Components/FaceRecognition/FaceRecognition";
import Register from "./Components/Register/Register";
import Signin from "./Components/Signin/Signin";
import ParticlesBg from "particles-bg";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);

    const setupClarify = (imgURL) => {
      const PAT = "16d7377fac624abfa9ad3b0799204696";
      const USER_ID = "danielmuszkiet";
      const APP_ID = "SmartBrain";
      const IMAGE_URL = imgURL;

      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: IMAGE_URL,
              },
            },
          },
        ],
      });

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
        },
        body: raw,
      };

      return requestOptions;
    };

    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      setupClarify(input)
    )
      .then((response) => response.json())
      .then((result) => displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const bbox_faces = data.outputs[0].data.regions.map((pos) => {
      const bbox_data = pos.region_info.bounding_box;
      return {
        leftCol: bbox_data.left_col * width,
        topRow: bbox_data.top_row * height,
        rightCol: width - bbox_data.right_col * width,
        bottomRow: height - bbox_data.bottom_row * height,
      };
    });

    return bbox_faces;
  };

  const displayFaceBox = (bbox) => {
    setBoxes(bbox);
  };

  const onRouteChange = (r) => {
    if (r === "signin") {
      setIsSignedIn(false);
    } else if (r === "home") {
      setIsSignedIn(true);
    }
    setRoute(r);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecogntion boxes={boxes} imageURL={imageURL} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
      <ParticlesBg color="#c9c9c9" num={100} type="cobweb" bg={true} />
    </div>
  );
}

export default App;
