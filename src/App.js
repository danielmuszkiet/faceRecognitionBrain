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
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);

    fetch("https://smartbrainbackend-lp45.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("https://smartbrainbackend-lp45.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((updatedUser) => {
              if (updatedUser) {
                loadUser(updatedUser);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
          displayFaceBox(calculateFaceLocation(result));
        }
      })
      .catch((error) => console.log("Error: Check URL"));
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const bbox_faces = data.map((pos) => {
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
    setBoxes([]);
    setImageURL("");
  };

  const loadUser = (data) => {
    const { id, name, email, entries, joined } = data;
    setUser({
      id: id,
      name: name,
      email: email,
      entries: entries,
      joined: joined,
    });
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecogntion boxes={boxes} imageURL={imageURL} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
      <ParticlesBg color="#c9c9c9" num={100} type="cobweb" bg={true} />
    </div>
  );
}

export default App;
