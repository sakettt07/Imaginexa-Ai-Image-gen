import React, { useRef, useState } from "react";
import "./Imagegrn.css";
import defaultim from "../components/Assets/frogyy.jpg";

const Imagegen = () => {
  const [image, setImage] = useState(defaultim);
  let inputRef = useRef(null);

  const imageGen = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR API KEY",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_arr = data.data;
    setImage(data_arr[0].url);
  };
  return (
    <div className="main">
      <div className="header">
        <h1>AI IMAGE </h1>
        <span> Generator</span>
      </div>
      <div className="imgloading">
        <div className="image">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="search">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Jaisi Chaiye bas likhdo"
        />
        <div className="gen-btn" onClick={imageGen}>
          {" "}
          Generate
        </div>
      </div>
    </div>
  );
};

export default Imagegen;
