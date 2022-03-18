import React, { useState, useEffect } from "react";

import image1 from "../../assets/slideshow/slideshow1.jpg";
import image2 from "../../assets/slideshow/slideshow2.jpg";
import image3 from "../../assets/slideshow/slideshow3.jpg";
//import image4 from "../../assets/slideshow/slideshow4.jpg";
import classes from "./Slideshow.module.css";

const Slideshow = () => {
  const [imageCounter, setImageCounter] = useState(0);

  useEffect(() => {
    const current = imageCounter;
    setTimeout(() => {
      setImageCounter(current + 1);
    }, 10000);
  }, [imageCounter]);

  return (
    <div className={classes["main-image"]}>
      {imageCounter % 4 === 0 ? (
        <img src={image1} alt="shotgun range club" />
      ) : imageCounter % 4 === 1 ? (
        <img src={image2} alt="family range gun" />
      ) : (
        <img src={image3} alt="competition range gun" />
      )}
    </div>
  );
};

export default Slideshow;
